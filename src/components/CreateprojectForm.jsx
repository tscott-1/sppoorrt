import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import postCreateproject from "../api/post-createproject.js";

// function clubpage() {
//   let params = useParams()
//   params.postId
// }

function CreateprojectForm() {
    const navigate = useNavigate(); 

    // const useclub = () =>

    const [details, setDetails] = useState({
          title: "",
          description: "",
          goal: "",
          image: "",
          fund_type: "",
          is_open: "True",
          end_date: "",
          member_only: "False",
          owner_club: 34,
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
            if (details.title && details.owner_club) {
              postCreateproject(
                    details.title,
                    details.description,
                    details.goal,
                    details.image,
                    details.fund_type,
                    details.is_open,
                    details.end_date,
                    details.member_only,
                    details.owner_club
                ).then((response) => {
                    console.log(response);
            });
            }
    };

    return (
      <form>
        <div>
        <label htmlFor="title">Title:</label>
            <input
                  type="text"
                  id="title"
                  placeholder="Enter fundraiser title"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="description">First Name:</label>
          <input
                  type="text"
                  id="description"
                  placeholder="Enter fundraiser description"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="goal">Fundraiser Goal:</label>
          <input 
                type="int" 
                id="goal" 
                placeholder="Enter fundraiser target amount"
                onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
                  type="url"
                  id="image"
                  placeholder="Enter URL of fundraiser image"
                  onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="fund_type">Fundraiser Type:</label>
          <input 
                type="text" 
                id="fund_type" 
                placeholder="E:Equipment and Uniforms C:Competitions and Events F:Players Fees S:Coaching I:Club Infrastructure"
                onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="end_date">Fundraiser end date:</label>
          <input
                  type="date"
                  id="end_date"
                  placeholder="Enter Fundraiser end date"
                  onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Create Project</button>
      </form>
    );
  }
  
  export default CreateprojectForm;