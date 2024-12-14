import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useClubs from "../hooks/use-clubs";
import ClubCard from "../components/ClubCard";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js";
import { Link, Outlet } from "react-router-dom";

function HomePage() {
  const { auth, setAuth } = useAuth();
  const { projects } = useProjects(); 
  const { clubs } = useClubs();
  const navigate = useNavigate(); 

  const browseProjects = (event) => {
    event.preventDefault(); // Prevent unintended behavior
    navigate(`/projects`);
  };

  const browseClubs = (event) => {
    event.preventDefault(); // Prevent unintended behavior
    navigate(`/clubs`);
  };

  const addClub = (event) => {
    event.preventDefault(); // Prevent unintended behavior
    navigate(`/createclub`);
  };

  return (
    <>
      <div className="headline">
        <h1>Welcome to <div className="logo">SPP<span className="green-o"></span><span className="green-o"></span>RRT</div></h1>
        <h2>Where you can Support your favorite Sports</h2>
      </div>
      <h1 className="headline">Some of our recent Projects:</h1>

      <div id="project-list">
        {projects.slice(0, 3).map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </div> 
      <div>
          <button type="button" onClick={browseProjects}>
              Browse More Projects Here
          </button>
      </div>

      <h1 className="headline">Some of our busiest clubs:</h1>
           
      <div id="club-list">
        {clubs.slice(0, 3).map((clubData, key) => {
          return <ClubCard key={key} clubData={clubData} />;
        })}
      </div>
      <div>
          <button type="button" onClick={browseClubs}>
              Browse More Clubs Here
          </button>
      </div>
      <div>
        {auth.token ? (
          <button type="button" onClick={addClub}>
          Add your own club Here
          </button>
        ) : null}
      </div>    
    </>
  );
}

export default HomePage;
