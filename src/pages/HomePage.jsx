import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import useClubs from "../hooks/use-clubs";
import ClubCard from "../components/ClubCard";
import "./HomePage.css";

function HomePage() {
  const { projects } = useProjects(); 
  const { clubs } = useClubs(); 
  return (
    <>
    <div id="project-list">
      <h1>Projects</h1>
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
    </div> 
    <div id="club-list">
        <h1>Clubs</h1>
        {clubs.map((clubData, key) => {
          return <ClubCard key={key} clubData={clubData} />;
        })}
    </div>
    </>
  );
}

export default HomePage;