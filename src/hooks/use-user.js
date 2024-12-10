import { useState, useEffect } from "react";

import getUser from "../api/get-user";

export default function useUser(user_id) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
   // If no user_id, set loading to false and exit
   if (!user_id) {
    setUser(null);
    setIsLoading(false);
    return;
  }

  setIsLoading(true);
  setError(null);

  getUser(user_id)
    .then((user) => {
      setUser(user);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, [user_id]);


  return { user, isLoading, error };
}