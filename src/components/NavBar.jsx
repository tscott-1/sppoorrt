import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
      window.localStorage.removeItem("token");
      setAuth({ token: null });
  };

  return (
    <div>
      <nav>
        <img src="../images/SPPORRT_LOGO.png" alt="SPPOORRT" />
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
          ) : (
          <Link to="/login">Login</Link>
        )}
        {auth.token ? (
          <Link to="/createclub">
            Create Club
          </Link> 
          ) : ([])
        }
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      {/* React Router will pass components into the <Outlet /> based on the path */}
      <Outlet />
    </div>
  );
}

export default NavBar;