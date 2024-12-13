import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import CreatepledgeForm from "../components/CreatepledgeForm";
import { useAuth } from "../hooks/use-auth.js";
import { Link, Outlet } from "react-router-dom";

function ProjectPage() {
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { clubid, projectid } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(projectid); 

      
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    if (!project) {
        return <p>No project found</p>;
    }

    const totalPledged = project.pledges ? 
        project.pledges.reduce((total, pledge) => total + pledge.amount, 0) 
        : 0;
    
    const progressPercentage = project.goal 
        ? Math.min((totalPledged / project.goal) * 100, 100) 
        : 0;


    return (
      <>
      <div className="PageDisplay">
      
        <section className="hero1">
            <img src={project.image} />
        </section>
        <section className="hero2">
                <h1>{project.title}</h1>
                <h2>        
                    A project for the {project.club.club} - A {project.club.sport_id.sport} Club
                </h2>
                <h3>
                    {project.description}
                </h3>
                <h3>
                Open Since: {new Date(project.date_created).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}
                </h3>
                <h3>
                Open until: {new Date(project.end_date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}
                </h3>
                <h3>Status: {project.is_open ? "Taking Pledges" : "Pledges Closed"}</h3>
        </section>
   
        {/* Progress bar */}
    <div className="pledges">  
        <div className="progressbar" style={{ margin: "20px 0" }}>
                <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Raised ${totalPledged} of ${project.goal}
                </div>
                <div style={{ background: "#ddd", borderRadius: "8px", overflow: "hidden", height: "20px", width: "80%", }}>
                    <div
                        style={{
                            width: `${progressPercentage}%`,
                            background: "var(--primary-color)",
                            height: "100%",
                            transition: "width 0.5s ease",
                        }}
                    ></div>
                </div>
        </div>
        <div>                
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            <span id="pledgedetails">${pledgeData.amount} from {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter.username}</span> <br></br>
                            {pledgeData.comment}
                        </li>
                    );
                })}
            </ul>
        </div>
        <h1>Pledge to this fund</h1>
        <div id="create-pledge">
            {auth.token ? 
            <CreatepledgeForm /> :
            <Link to="/login">Login to pledge</Link>
            }
        </div>  
    </div>
    </div>
      </>
    );
}

export default ProjectPage;