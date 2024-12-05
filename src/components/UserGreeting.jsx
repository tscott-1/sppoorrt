import React from "react";
import useUserData from "../hooks/get-user";

function UserGreeting() {
    const { user, loading, error } = useUserData();

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (error) {
        return <p>Error fetching user info: {error.message}</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.first_name}!</h1>
            <p>Your User ID: {user.id}</p>
        </div>
    );
}

export default UserGreeting;
