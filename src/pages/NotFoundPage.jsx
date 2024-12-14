import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;