import { useState, useEffect } from "react";

import getUser from "../api/get-user";

export default function useUser(user_id) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  if (!user_id) {
    return { user: null, isloading: false, error:null };
  }

  useEffect(() => {
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