import { useState, useEffect } from "react";

import getSports from "../api/get-sports";

export default function useSports() {
  const [sports, setSports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getSports()
      .then((fetchedSports) => {
        // Sort sports alphabetically, with "Other" always last
        const sortedSports = fetchedSports.sort((a, b) => {
          // If either sport is "Other", it goes last
          if (a.sport === "Other") return 1;
          if (b.sport === "Other") return -1;
          
          // Otherwise, sort alphabetically
          return a.sport.localeCompare(b.sport);
        });

        setSports(sortedSports);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { sports, isLoading, error };
}