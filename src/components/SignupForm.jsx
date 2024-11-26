import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postSignup from "../api/post-signup.js";

function SignupForm() {
    const navigate = useNavigate(); 

    const [details, setDetails] = useState({
          username: "",
          first_name: "",
          email: "",
          password: "",
    });
    
    const handleChange = (event) => {
          const { id, value } = event.target;
          setDetails((prevDetails) => ({
              ...prevDetails,
              [id]: value,
          }));
    };

    const handleSubmit = (event) => {
            event.preventDefault();
            if (details.username && details.password) {
                postSignup(
                    details.username,
                    details.first_name,
                    details.email,
                    details.password
                ).then((response) => {
                    console.log(response);
                    navigate("/login");
            });
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
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
                  type="text"
                  id="first_name"
                  placeholder="Enter First Name"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
                type="email" 
                id="email" 
                placeholder="email"
                onChange={handleChange} />
        </div>
        <div>
        <label htmlFor="password">Password:</label>
            <input
                 type="password"
                 id="password"
                 placeholder="Password"
                 onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
      </form>
    );
  }
  
  export default SignupForm;