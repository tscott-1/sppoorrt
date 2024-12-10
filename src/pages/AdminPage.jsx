import SportsTable from "../components/SportsTable";
import CreatesportForm from "../components/CreatesportForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user";

function AdminPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    
    const user_id = auth.token ? window.localStorage.getItem("user_id") : null;
    

    const {user, isLoading, error } = useUser(user_id) 

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    // Handle errors for user or club
    if (error) {
      return <p>User Error: {Error.message}</p>;
    }

    return (
    <>
    {user.is_staff ? (
        <>
        <h1>{`Welcome ${user.username}`}</h1>
           <div>
           <SportsTable />;
            </div>
            <div>
              <CreatesportForm />;
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

export default AdminPage;