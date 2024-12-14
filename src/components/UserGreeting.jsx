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
    <>
    <div>
      <h1>Welcome back, {user.username}!</h1>
      <p>First Name:  {user.first_name}!</p>
      <p>Last Name:  {user.last_name}!</p>
      <p>Your User ID: {user.id}</p>
      
    </div>
    <div>
      <h3>Someone should really give you an option to edit this!</h3>
    </div>
    </>
  );
}

export default UserGreeting;
