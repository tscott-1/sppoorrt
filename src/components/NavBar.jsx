import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("user_email");
      setAuth({ token: null });
  };

  return (
    <>
    <div>


      <nav>
      <div class="logo">
        SPP<span class="green-o"></span><span class="green-o"></span>RRT
    </div>
       <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
          ) : (
          <Link to="/login">Login</Link>
        )} 
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
    </>  
  );
}

export default NavBar;