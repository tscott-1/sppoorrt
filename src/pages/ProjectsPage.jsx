import { useState } from "react";
import useProjects from "../hooks/use-projects.js";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";

function ProjectsPage() {
  const { auth, setAuth } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();

  // setting up state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // filter projects using searchquery - force lowercase everywhere to make sure it all matches
  const filteredProjects = projects.filter((projectData) =>
    projectData.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <h1>Browse All Projects</h1>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div id="project-list">
        {/* {projects.map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
          })} */}
        {filteredProjects.length > 0 ? (
          filteredProjects.map((projectData, key) => (
            <ProjectCard key={key} projectData={projectData} />
          ))
        ) : (
          <p>No projects found matching your search.</p>
        )}
      </div>
    </>
  );
}

export default ProjectsPage;
