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


    
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
      <>
      <div>
        <h2>{project.title}</h2>
        <h3>        
            {project.club.club}
        </h3>
        <h3>Created at: {project.date_created}</h3>
        <h3>{`Status: ${project.is_open}`}</h3>
        <h3>Pledges:</h3>
        <ul>
            {project.pledges.map((pledgeData, key) => {
                return (
                    <li key={key}>
                        {pledgeData.amount} from {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter.username}

                    </li>
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