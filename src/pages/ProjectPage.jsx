import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import CreatepledgeForm from "../components/CreatepledgeForm";
import { useAuth } from "../hooks/use-auth.js";
import { Link, Outlet } from "react-router-dom";

function ProjectPage() {
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id); 
    // Calculate the total amount pledged
    const totalPledged = project.pledges.reduce((total, pledge) => total + pledge.amount, 0);
    // Calculate progress percentage
    const progressPercentage = Math.min((totalPledged / project.goal) * 100, 100);


    
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
      <>
      <div>
        <div>
        <img src={project.image} />
        </div>
        <div>
        <h2>{project.title}</h2>
        <h3>        
            A project for the <br></br>{project.club.club} <br></br>A {project.club.sport_id.sport} Club
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
        </div>
        {/* Progress bar */}
        <div style={{ margin: "20px 0" }}>
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                Raised ${totalPledged} of ${project.goal}
            </div>
            <div style={{ background: "#ddd", borderRadius: "8px", overflow: "hidden", height: "20px", width: "100%" }}>
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

        <h3>Pledges:</h3>
        <ul>
            {project.pledges.map((pledgeData, key) => {
                return (
                    <ul key={key}>
                        <span id="pledgedetails">${pledgeData.amount} from {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter.username}</span> <br></br>
                        {pledgeData.comment}
                    </ul>
                  );
              })}
          </ul>
      </div>
      <div>
      <h1>Pledge to this fund</h1>
      <div id="create-pledge">
        {auth.token ? 
          <CreatepledgeForm /> :
          <Link to="/login">Login to pledge</Link>
        }
      </div>  
      </div>
      </>
    );
}

export default ProjectPage;