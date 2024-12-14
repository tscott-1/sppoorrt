import { useParams } from "react-router-dom";
import useClub from "../hooks/use-club";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useUser from "../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import { useState, useEffect } from "react";
import deleteClub from "../api/delete-club.js";

function ClubPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { clubid } = useParams();
    const { projects } = useProjects(); 

 
    const user_id = auth.token ? window.localStorage.getItem("user_id") : null;

    // Always call hooks; pass null to useUser if user_id is not available
    const { user, isLoading: isUserLoading, error: userError } = useUser(user_id);
  
    // useClub returns three pieces of info, so we need to grab them all here
    
    const { club, isLoading: isClubLoading, error: clubError } = useClub(clubid); 

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
      (projectData) => projectData.club.id === parseInt(clubid, 10) && projectData.is_open
    );


    const handleProject = (event) => {
      event.preventDefault(); // Prevent unintended behavior
      navigate(`createproject/`);
    };

    const handleUpdate = (event) => {
      event.preventDefault(); // Prevent unintended behavior
      navigate(`updateclub/`);
    };

    const handleDelete = (event) => {
      event.preventDefault();
      const confirmDelete = window.confirm("Are you sure you want to delete this club? This action cannot be undone.");
  
    if (confirmDelete) {
      deleteClub(clubid)
        .then((response) => {
          console.log("Club deleted successfully", response);
          navigate("/");
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          // Optional: Show error to user
          alert(`Failed to delete club: ${error.message}`);
        });
      }
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
                  <div>
                    <button type="button" onClick={handleDelete}>
                        Delete Club
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
            {filteredProjects.map((projectData) => (
            <ProjectCard 
            key={projectData.projectid} 
            projectData={projectData} 
          />
        ))}
        </div>      
      
      </div>
      </>
    );

    
}

export default ClubPage;