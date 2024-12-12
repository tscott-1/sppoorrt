import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import { Link, Outlet } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); // For error handling

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (credentials.username && credentials.password) {
      try {
        const response = await postLogin(credentials.username, credentials.password);

        // Save the token and user info in local storage
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.user_id);
        window.localStorage.setItem("user_email", response.email);

        // Update auth context
        setAuth({
          token: response.token,
          user_id: response.user_id,
          user_email: response.email,
        });

        // Navigate to the home page
        navigate(-1);
      } catch (err) {
        setError("Invalid username or password");
      }
    } else {
      setError("Both fields are required");
    }
  };


  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}
      <div>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <div>
        
          Don't have an account?  <Link to="/signup">Sign up</Link> here.
       
      </div>
    </form>
  );
}

export default LoginForm;
