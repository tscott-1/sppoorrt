import { useState } from "react";
import useClubs from "../hooks/use-clubs";
import ClubCard from "../components/ClubCard";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";

function ClubsPage() {
  const { auth, setAuth } = useAuth();
  const { clubs } = useClubs();
  const navigate = useNavigate();

  // setting up state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // filter clubs using searchquery - force lowercase everywhere to make sure it all matches
  const filteredClubs = clubs.filter((clubData) =>
    clubData.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClub = (event) => {
    event.preventDefault();
    navigate(`/createclub/`);
  };

  return (
    <>
      <h1>Browse All Clubs</h1>
      <div className="add-sports-page-link">
        {auth.token ? (
          <button onClick={handleAddClub}>Add your Sports Club</button>
        ) : null}
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search clubs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div id="club-list">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((clubData, key) => (
            <ClubCard key={key} clubData={clubData} />
          ))
        ) : (
          <p>No clubs found matching your search.</p>
        )}
      </div>
    </>
  );
}

export default ClubsPage;
