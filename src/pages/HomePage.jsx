import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useClubs from "../hooks/use-clubs";
import ClubCard from "../components/ClubCard";
import "./HomePage.css";
import { useAuth } from "../hooks/use-auth.js";
import { Link, Outlet } from "react-router-dom";


function HomePage() {
  const {auth, setAuth} = useAuth();
  const { projects } = useProjects(); 
  const { clubs } = useClubs(); 
  return (
    <>
    <h1>Projects</h1>
    <div id="project-list">
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
    </div> 
    <h1>Clubs</h1>  
    <div>
    {auth.token ? (
          <Link to="/createclub">
            Add your Sports Club
          </Link> 
          ) : ([])
        }
    </div>    
    <div id="club-list">
        {clubs.map((clubData, key) => {
          return <ClubCard key={key} clubData={clubData} />;
        })}
    </div>
    </>
  );
}

export default HomePage;