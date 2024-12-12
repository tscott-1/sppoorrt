import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreateclub from "../api/post-createclub.js";

function CreateclubForm() {
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
            if (details.club) {
                postCreateclub(
                    details.club,
                    details.description,
                    details.club_size,
                    details.club_location,
                    details.club_logo,
                    details.sport,
                    details.is_active
                ).then((response) => {
                    console.log(response);
                    navigate("/");
            });
            }
    };

    return (
      <form>
        <div>
        <label htmlFor="club">Username:</label>
            <input
                  type="text"
                  id="club"
                  placeholder="Enter club name"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="description">First Name:</label>
          <input
                  type="text"
                  id="description"
                  placeholder="Enter club description"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="club_size">Club Size:</label>
          <input 
                type="text" 
                id="club_size" 
                placeholder="S:<10 M:10-50 L:50-120 XL:>120"
                onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="club_location">Club Location:</label>
          <input 
                type="text" 
                id="club_location" 
                placeholder="Enter club location"
                onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="club_logo">Logo:</label>
          <input
                  type="url"
                  id="club_logo"
                  placeholder="Enter URL of club logo"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="sport">Sport:</label>
          <input
                  type="id"
                  id="sport"
                  placeholder="Enter sport type"
                  onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
      </form>
    );
  }
  
  export default CreateclubForm;