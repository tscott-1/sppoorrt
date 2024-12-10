import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreatesport from "../api/post-createsport.js";

function CreatesportForm() {
    const navigate = useNavigate(); 

    const [details, setDetails] = useState({
          sport: "",
          sport_id: "",
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
            if (details.sport) {
                postCreatesport(
                    details.sport,
                    details.sport_type,
                ).then((response) => {
                    console.log(response);
                    console.log(details);
                    navigate(0);
            });
            }
    };

    return (
      <form>
        <div>
        <label htmlFor="sport">Sport:</label>
            <input
                  type="text"
                  id="sport"
                  placeholder="Enter sport"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="sport_type">Sport type:</label>
          <select
                id="sport_type"
                value={details.sport_type}
                onChange={handleChange}>
                   <option value="">--Select Sport Type--</option>
                      <option value="Field">Field</option>
                      <option value="Court">Court</option>
                      <option value="Water">Water</option>
                      <option value="Athletics">Athletics</option>
                      <option value="Other">Other</option>
            </select>
        </div>
            <button type="submit" onClick={handleSubmit}>Create Sport</button>
      </form>
    );
  }
  
  export default CreatesportForm;