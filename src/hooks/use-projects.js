import { useState, useEffect } from "react";

import getProjects from "../api/get-projects";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getProjects()
      .then((projects) => {
        // Sort projects by date_created in descending order (most recent first)
        const sortedProjects = projects.sort((a, b) => 
          new Date(b.date_created) - new Date(a.date_created)
        );
        setProjects(sortedProjects);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { projects, isLoading, error };
}