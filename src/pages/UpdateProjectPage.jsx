import UpdateClubForm from "../components/UpdateclubForm.jsx";
import useUser from "../hooks/use-user.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import useClub from "../hooks/use-club.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useProject from "../hooks/use-project.js";
import UpdateprojectForm from "../components/UpdateprojectForm.jsx";

function UpdateProjectPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { clubid, projectid } = useParams();
 
    const user_id = auth.token ? window.localStorage.getItem("user_id") : null;

    // Always call hooks; pass null to useUser if user_id is not available
    const { user, isLoading: isUserLoading, error: userError } = useUser(user_id);
  
    // useClub returns three pieces of info, so we need to grab them all here
    
    const { club, isLoading: isClubLoading, error: clubError } = useClub(clubid); 
    const { project, isLoading: isProjectLoading, error: projectError } = useProject(projectid)
    

    const [isOwner, setIsOwner] = useState(false);
    // Update `isOwner` when `user_id` or `club` changes
    useEffect(() => {
        if (club && user_id) {
            setIsOwner(parseInt(user_id, 10) === club.club_owner.id);
        }
    }, [user_id, club]);

    if (isUserLoading || isClubLoading || isProjectLoading) {
      return <p>Loading...</p>;
    }
  
    // Handle errors for user or club
    if (userError) {
      return <p>User Error: {userError.message}</p>;
    }
    if (clubError) {
      return <p>Club Error: {clubError.message}</p>;
    }
    if (projectError) {
      return <p>Project Error: {projectError.message}</p>;
    }

    return (
    <>
    {isOwner ? (
        <>
        <h1>{`Welcome ${user.username}`}</h1>
            <h2>{`Update details for ${club.club} project ${project.title}`}</h2>
              <div id="updateProject">
              <UpdateprojectForm />;
          </div>  
        </>
        ) : (
        <>
        <h2>To update this project, contact: <span style={{color:'blue'}}> {club.club_owner.username}    </span>     email: <span style={{color:'blue'}}>{club.club_owner.email}</span></h2>
        </>
        )
    }

    </>
    );
}

export default UpdateProjectPage;