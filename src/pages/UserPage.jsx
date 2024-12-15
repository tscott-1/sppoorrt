import UserGreeting from "../components/UserGreeting";
import useClubs from "../hooks/use-clubs";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import React from "react";
import useUser from "../hooks/use-user.js";
import { useNavigate } from "react-router-dom";
import ClubCard from "../components/ClubCard";
import { useAuth } from "../hooks/use-auth.js";

function UserPage() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate(); 
    const user_id = localStorage.getItem('user_id')
        
    const { user, isLoading: isUserLoading, error: userError } = useUser(user_id);
    const { clubs, isLoading: isClubsLoading, error: clubsError } = useClubs(); 
    const { projects, isLoading: isProjectsLoading, error: projectsError } = useProjects(); 
      
    
  
    if (isUserLoading || isClubsLoading || isProjectsLoading) {
    return <p>Loading...</p>;
    }
    
      // Handle errors for user or club
    if (userError) {
    return <p>User Error: {userError.message}</p>;
    }
    if (clubsError) {
    return <p>Club Error: {clubsError.message}</p>;
    }
    if (projectsError) {
        return <p>Club Error: {clubsError.message}</p>;
        }

    const filteredClubs = (clubs || []).filter(
        (clubData) => parseInt(clubData.club_owner.id,10) === parseInt(user_id, 10) && clubData.is_active
        );  

    const ownedClubIds = filteredClubs.map((clubData) => clubData.id); 
        
    const filteredProjects = (projects || []).filter(
        (projectData) => ownedClubIds.includes(projectData.club.id) && projectData.is_open
        );    
  

    return (
    <>
        <div>
          <h1>Welcome back, {user.username}!</h1>
          <p>First Name:  {user.first_name}!</p>
          <p>Last Name:  {user.last_name}!</p>
          <p>Your User ID: {user.id}</p>
          
        </div>

        {/* <div>
          <h3>Someone should really give you an option to edit this!</h3>
        </div> */}

        <div>
            <h1>My Clubs</h1>
            <div id="club-list">
                {filteredClubs.map((clubData) => (
                <ClubCard 
                key={clubData.clubid} 
                clubData={clubData} 
            />
            ))}
            </div> 
        </div> 

        <div>
            <h1>My Projects</h1>
            <div id="project-list">
                {filteredProjects.map((projectData) => (
                <ProjectCard 
                key={projectData.projectid} 
                projectData={projectData} 
            />
            ))}
            </div> 
        </div> 
    </>
      );
    }

export default UserPage;