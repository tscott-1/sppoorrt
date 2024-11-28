import { useState, useEffect } from "react";

import getClub from "../api/get-club";

export default function useclub(clubId) {
  const [club, setClub] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // Here we pass the clubId to the getclub function.
    getClub(clubId)
      .then((club) => {
        setClub(club);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the clubId to the dependency array so that the hook will re-run if the clubId changes.
  }, [clubId]);

  return { club, isLoading, error };
}