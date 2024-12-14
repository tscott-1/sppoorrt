import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import getProject from "../api/get-project";
import putUpdateproject from "../api/put-updateproject";


// function clubpage() {
//   let params = useParams()
//   params.postId
// }

function UpdateprojectForm() {
      const navigate = useNavigate(); 
      const { clubid, projectid } = useParams(); // Extract the id from the URL

   
      const [details, setDetails] = useState({
            title: "",
            description: "",
            goal: "",
            image: "",
            fund_type: "",
            is_open: "",
            end_date: "",
      });

      const [isProjectLoading, setIsProjectLoading] = useState(true);
      const [projectError, setprojectError] = useState(null);
  
      useEffect(() => {
        // Fetch the current project's details
        getProject(projectid)
            .then((projectData) => {
                // Update the state with the fetched club data
                setDetails({
                  title: projectData.title,
                  description: projectData.description,
                  goal: projectData.goal,
                  image: projectData.image,
                  fund_type: projectData.fund_type,
                  is_open: projectData.is_open,
                  end_date: projectData.end_date,
                });
                setIsProjectLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
                setProjectError(error);
                setIsProjectLoading(false);
            });
      }, [projectid]);
      
      const handleChange = (event) => {
            const { id, value, type, checked } = event.target;
            setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: type === "checkbox" ? checked : value, // Update checkbox state correctly
            }));
      };

      const handleSubmit = (event) => {
                  event.preventDefault();
                  if (details.title) {
                  putUpdateproject(
                        projectid,
                        details.title,
                        details.description,
                        details.goal,
                        details.image,
                        details.fund_type,
                        details.is_open,
                        details.end_date
                  ).then((response) => {
                        console.log(response);
                        navigate(`/clubs/${clubid}/projects/${projectid}`);
                  });
                  }
      };

       // Loading and error handling
      if (isProjectLoading) return <div>Loading...</div>;
      if (projectError) return <div>Error loading data</div>;

      return (
            <form>
            <div>
            <label htmlFor="title">Title:</label>
                  <input
                        type="text"
                        id="title"
                        placeholder="Enter fundraiser title"
                        value={details.title}
                        onChange={handleChange}
                  />
            </div>
            <div>
            <label htmlFor="description">Fundraiser description:</label>
            <input
                        type="text"
                        id="description"
                        placeholder="Enter fundraiser description"
                        value={details.description}
                        onChange={handleChange}
                  />
            </div>
            <div>
            <label htmlFor="goal">Fundraiser Goal:</label>
            <input 
                  type="int" 
                  id="goal" 
                  placeholder="Enter fundraiser target amount"
                  value={details.goal}
                  onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="image">Image:</label>
            <input
                        type="url"
                        id="image"
                        placeholder="Enter URL of fundraiser image"
                        value={details.image}
                        onChange={handleChange}
                  />
            </div>
            <div>
            <label htmlFor="fund_type">Fundraiser Type:</label>
            <select
                  id="fund_type"
                  value={details.fund_type}
                  onChange={handleChange}>
                        <option value="">--Select Fund Type--</option>
                        <option value="E">Equipment and Uniforms</option>
                        <option value="C">Competitions and Events</option>
                        <option value="F">Players Fees</option>
                        <option value="S">Coaching</option>
                        <option value="I">Club Infrastructure</option>
            </select>
            </div>
            
            <div>
            <label htmlFor="end_date">Fundraiser end date:</label>
            <input
                        type="date"
                        id="end_date"
                        placeholder="Enter Fundraiser end date"
                        value = {details.end_date}  // Set the default date
                        onChange={handleChange}
                  />
            </div>
            <div>
                  <input
                        type="checkbox"
                        id="is_open"
                        checked={details.is_open}
                        onChange={handleChange}
                  />
                        <label for="is_open" id="checkboxlabel"> Project is Open</label>
            </div>
            <button type="submit" onClick={handleSubmit}>Update Project</button>
            </form>
      );
      }
      
      export default UpdateprojectForm;