import { Link } from "react-router-dom";
import "./Cards.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `/project/${projectData.id}`;

  return (
    <div className="card">
      <Link to={projectLink}>
        <img src={projectData.image} />
        <h3>{projectData.title}</h3>
        {/* <h3>{projectData.club.id}</h3> */}
        <h3>{projectData.club.club}</h3>
      </Link>
    </div>
  );
}

export default ProjectCard;