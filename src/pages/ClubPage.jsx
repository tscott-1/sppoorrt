import { useParams } from "react-router-dom";
import useClub from "../hooks/use-club";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import CreateprojectForm from "../components/CreateprojectForm";

function ClubPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { id } = useParams();
    const { projects } = useProjects(); 
    // useClub returns three pieces of info, so we need to grab them all here
    const { club, isLoading, error } = useClub(id); 
    
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

      // Filter projects where projectData.club.id matches the club's id
    const filteredProjects = (projects || []).filter(
      (projectData) => projectData.club.id === parseInt(id, 10)
    );

    return (
      <>
      <div>
        <div>
        <img src={club.club_logo} />
        </div>
        <div>
        <h2>{club.club}</h2>
        <h3>        
            {club.desription}
        </h3>
        {/* <h3>Created at: {club.date_created}</h3> */}
        <h3>{`Active Club: ${club.is_active}`}</h3>
        <h3>{`Club Location: ${club.club_location}`}</h3>
        <h3>{club.club_size}</h3>
        <h3>{club.sport.sport}</h3>
        </div>
      </div>
      <div>
      <h1>Projects</h1>
      <div id="project-list">
          {filteredProjects.map((projectData) => {
            return <ProjectCard key={projectData.id} projectData={projectData} />;
          })}
      </div>      
      </div>
      <div>
      <h1>Create Project</h1>
      <div id="create-project">
          return <CreateprojectForm />;
      </div>      
      </div>
      </>
    );

    
}

export default ClubPage;