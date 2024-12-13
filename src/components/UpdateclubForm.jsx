import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import putUpdateclub from "../api/put-updateclub";
import getClub from "../api/get-club";
import useSports from "../hooks/use-sports"; // Add this import

function UpdateClubForm() {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { sports, isLoading: isSportsLoading, error: sportsError } = useSports();

    const [details, setDetails] = useState({
          club: "",
          description: "",
          club_size: "",
          club_location: "",
          club_logo: "",
          sport: "",
          is_active: ""
    });

    const [isClubLoading, setIsClubLoading] = useState(true);
    const [clubError, setClubError] = useState(null);

    useEffect(() => {
      // Fetch the current club's details
      getClub(id)
          .then((clubData) => {
              // Update the state with the fetched club data
              setDetails({
                  club: clubData.club,
                  description: clubData.description,
                  club_size: clubData.club_size,
                  club_location: clubData.club_location,
                  club_logo: clubData.club_logo,
                  sport: clubData.sport,
                  is_active: clubData.is_active
              });
              setIsClubLoading(false);
          })
          .catch((error) => {
              console.error("Error fetching club details:", error);
              setClubError(error);
              setIsClubLoading(false);
          });
  }, [id]);
     
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
                putUpdateclub(
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
                    navigate(-1);
                  }).catch((error) => {
                    console.error("Error updating club:", error);
                });
            }
    };

    // Loading and error handling
    if (isClubLoading || isSportsLoading) return <div>Loading...</div>;
    if (clubError || sportsError) return <div>Error loading data</div>;

    return (
      <form>
        <div>
            <label htmlFor="club">Club:</label>
            <input
                type="text"
                id="club"
                placeholder="Enter club name"
                value={details.club}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                placeholder="Enter club description"
                value={details.description}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="club_size">Club Size:</label>
            <select
                id="club_size"
                value={details.club_size}
                onChange={handleChange}
            >
                <option value="">--Select Club Size--</option>
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
                value={details.club_location}
                placeholder="Enter club location"
                onChange={handleChange} 
            />
        </div>
        <div>
            <label htmlFor="club_logo">Logo:</label>
            <input
                type="url"
                id="club_logo"
                value={details.club_logo}
                placeholder="Enter URL of club logo"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="sport">Sport:</label>
            <select
                id="sport"
                value={details.sport}
                onChange={handleChange}
            >
                <option value="">--Select Sport--</option>
                {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                        {sport.sport}
                    </option>
                ))}
            </select>
        </div>
        <button type="submit" onClick={handleSubmit}>Update Club Details</button>
      </form>
    );
}

export default UpdateClubForm;