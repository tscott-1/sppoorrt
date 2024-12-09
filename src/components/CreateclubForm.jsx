import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreateclub from "../api/post-createclub.js";

function CreateclubForm() {
    const navigate = useNavigate(); 

    const [details, setDetails] = useState({
          club: "",
          description: "",
          club_size: "",
          club_location: "",
          club_logo: "",
          sport: "",
          is_active: "true"
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
                    console.log(details);
                    navigate("/");
            });
            }
    };

    return (
      <form>
        <div>
        <label htmlFor="club">Club:</label>
            <input
                  type="text"
                  id="club"
                  placeholder="Enter club name"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
                  type="text"
                  id="description"
                  placeholder="Enter club description"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="club_size">Club Size:</label>
          <select
                id="club_size"
                value={details.club_size}
                onChange={handleChange}>
                   <option value="">--Select Fund Type--</option>
                      <option value="S">Less than 10 Members</option>
                      <option value="M">10-50 Members</option>
                      <option value="L">50-120 Members</option>
                      <option value="XL">More than 120 Members</option>
            </select>
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
        <button type="submit" onClick={handleSubmit}>Create Club</button>
      </form>
    );
  }
  
  export default CreateclubForm;