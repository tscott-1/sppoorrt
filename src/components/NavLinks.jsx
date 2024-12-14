import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user";


function NavLinks(props) {
  const {isClicked, closeMenu} = props
  // const {click && <NavLinks isClicked={true} closeMenu={closeMenu}/>} 


  const {auth, setAuth} = useAuth();

  const user_id = auth.token ? window.localStorage.getItem("user_id") : null;

  const {user, isLoading, error } = useUser(user_id) ;
  // console.log({user.is_superuser});

  if (isLoading) {
    return <p>Loading...</p>;
  }

   if (error) {
    return <p>User Error: {error.message}</p>;
  }

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
          <Link to="/clubs">Clubs</Link>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          <Link to="/projects">Projects</Link>
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          {auth.token && (
            <Link to="/user">
              Profile
            </Link>
          )} 
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          {user?.is_superuser && (
            <Link to="/admin">
              Admin
            </Link>
          )} 
          </li>
          <li onClick={() => isClicked && closeMenu()}>
          <Link to="/contact">Contact</Link>
          </li>
        </ul>  
      </nav>
  );
}

export default NavLinks;