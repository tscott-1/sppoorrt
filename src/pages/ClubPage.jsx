import { useParams } from "react-router-dom";
import useClub from "../hooks/use-club";

function ClubPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useClub hook.
    const { id } = useParams();
    // useClub returns three pieces of info, so we need to grab them all here
    const { club, isLoading, error } = useClub(id); 
    
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
      <div>
        <h2>{club.club}</h2>
        <h3>        
            {club.description}
        </h3>
        <h3>Created at: {club.date_created}</h3>
        <h3>{`Status: ${club.is_active}`}</h3>
        <h3>{club.club_location}</h3>
        <h3>{club.club_size}</h3>
        <h3>{club.sport}</h3>
      </div>
    );
}

export default ClubPage;