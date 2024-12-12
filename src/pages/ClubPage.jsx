import { useParams } from "react-router-dom";
import useClub from "../hooks/use-club";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useUser from "../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import { useState, useEffect } from "react";

function ClubPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { id } = useParams();
    const { projects } = useProjects(); 

 
    const user_id = auth.token ? window.localStorage.getItem("user_id") : null;

    // Always call hooks; pass null to useUser if user_id is not available
    const { user, isLoading: isUserLoading, error: userError } = useUser(user_id);
  
    // useClub returns three pieces of info, so we need to grab them all here
    
    const { club, isLoading: isClubLoading, error: clubError } = useClub(id); 

    const [isOwner, setIsOwner] = useState(false);
    // Update `isOwner` when `user_id` or `club` changes
    useEffect(() => {
        if (club && user_id) {
            setIsOwner(parseInt(user_id, 10) === club.club_owner.id);
        }
    }, [user_id, club]);

    if (isUserLoading || isClubLoading) {
      return <p>Loading...</p>;
    }
  
    // Handle errors for user or club
    if (userError) {
      return <p>User Error: {userError.message}</p>;
    }
    if (clubError) {
      return <p>Club Error: {clubError.message}</p>;
    }

      // Filter projects where projectData.club.id matches the club's id
    const filteredProjects = (projects || []).filter(
      (projectData) => projectData.club.id === parseInt(id, 10) && projectData.is_open
    );


    const handleProject = (event) => {
      event.preventDefault(); // Prevent unintended behavior
      navigate(`createproject/`);
    };

    const handleUpdate = (event) => {
      event.preventDefault(); // Prevent unintended behavior
      navigate(`updateclub/`);
    };


    return (
      <>
      <div className="PageDisplay">
        <div className="hero1">
          <img src={club.club_logo} />
        </div>
        <div className="hero3">
          <div>
            <h1>{club.club}</h1>
            <h3>        
                {club.description}
            </h3>
            <h3>{`Active Club: ${club.is_active}`}</h3>
            <h3>{`Club Location: ${club.club_location}`}</h3>
            {/* <h3>{club.club_size}</h3> */}
            <h3>{club.sport_id.sport}</h3>
            <h3>Contact: <span style={{color:'blue'}}> {club.club_owner.username}    </span>     email: <span style={{color:'blue'}}>{club.club_owner.email}</span></h3>
          </div>
              <div>
                {isOwner && (
                  <>
                    <div>
                        <button type="button" onClick={handleProject}>
                            Create Project
                        </button>
                    </div>
                      <div>
                      <button type="button" onClick={handleUpdate}>
                          Update Club Details
                      </button>
                  </div>
                  </>
                )}
              </div>
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
      </>
    );

    
}

export default ClubPage;