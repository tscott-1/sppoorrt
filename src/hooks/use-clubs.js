import { useState, useEffect } from "react";

import getClubs from "../api/get-clubs";
import getProjects from "../api/get-projects"; // Import projects to count them

export default function useClubs() {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // We'll need to fetch both clubs and projects to count project numbers
    Promise.all([
      getClubs(),
      getProjects()
    ])
    .then(([clubs, projects]) => {
      // Count projects for each club
      const clubProjectCounts = projects.reduce((counts, project) => {
        if (project.owner_club) {
          counts[project.owner_club] = (counts[project.owner_club] || 0) + 1;
        }
        return counts;
      }, {});

      // Add project count to each club and sort
      const clubsWithProjectCount = clubs.map(club => ({
        ...club,
        projectCount: clubProjectCounts[club.id] || 0
      })).sort((a, b) => b.projectCount - a.projectCount);

      setClubs(clubsWithProjectCount);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return { clubs, isLoading, error };
}