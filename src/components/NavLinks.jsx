import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function NavLinks(props) {
  const {isClicked, closeMenu} = props
  // const {click && <NavLinks isClicked={true} closeMenu={closeMenu}/>} 


  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("user_email");
      setAuth({ token: null });
  };

  return (
      <nav className="Navlinks">
      <ul>
        <li onClick={() => isClicked && closeMenu()}>
        <Link to="/">Home</Link>
        </li>
        <li onClick={() => isClicked && closeMenu()}>
          {auth.token ? (
            <Link to="/" onClick={handleLogout}>
              Log Out
            </Link>
            ) : (
            <Link to="/login">Login</Link>
          )} 
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          <Link to="/about">About</Link>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          <Link to="/contact">Contact</Link>
          </li>
        </ul>  
      </nav>
  );
}

export default NavLinks;