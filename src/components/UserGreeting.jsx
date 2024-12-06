import React from "react";
import useUser from "../hooks/use-user.js";



function UserGreeting() {
  const user_id = localStorage.getItem('user_id')
  const { user, loading, error } = useUser(user_id);
  

  if (loading) {
    return <p>Loading current user...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <h1>Welcome back, {user.first_name}!</h1>
      <p>Your User ID: {user.id}</p>
    </div>
  );
}

export default UserGreeting;
