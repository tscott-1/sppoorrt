import SportsTable from "../components/SportsTable";
import CreatesportForm from "../components/CreatesportForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user";
import { useEffect } from "react";

function AdminPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    
    const user_id = auth.token ? window.localStorage.getItem("user_id") : null;

    const {user, isLoading, error } = useUser(user_id) ;
    // console.log({user.is_superuser});

    useEffect(() => {
        if(!isLoading) {
            console.log("User object:", user);
            console.log("Is superuser:", user?.is_superuser);
            // If there's no user or the user is not staff, navigate to home
            if (!user || !user.is_superuser) {
                navigate("/");
        }
        }
    }
    , [user, isLoading, navigate]);


    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    // Handle errors for user or club
    if (error) {
      return <p>User Error: {error.message}</p>;
    }

    return (
    <>
        <div>
        <SportsTable />;
        </div>
        <div>
            <CreatesportForm />;
        </div>  
    </>

    );
      
}

export default AdminPage;