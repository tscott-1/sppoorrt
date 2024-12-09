import CreateprojectForm from "../components/CreateprojectForm";
import useUser from "../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import useClub from "../hooks/use-club";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CreateprojectPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { id } = useParams();
 
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

    return (
    <>
    {isOwner ? (
        <>
        <h1>{`Welcome ${user.first_name}`}</h1>
            <h2>{`Create Project for ${club.club}`}</h2>
              <div id="create-project">
              <CreateprojectForm />;
          </div>  
        </>
        ) : (
        <>
        <h1>placeholder</h1>
        </>
        )
    }

    </>
    );
}

export default CreateprojectPage;