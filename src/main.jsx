import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./Main.css";

// Here we import out pages
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ClubsPage from "./pages/ClubsPage.jsx";
import ClubPage from "./pages/ClubPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateclubPage from "./pages/CreateclubPage.jsx";
import CreateprojectPage from "./pages/CreateprojectPage.jsx";
import UpdateClubPage from "./pages/UpdateClubPage.jsx";
import UpdateProjectPage from "./pages/UpdateProjectPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import UserPage from "./pages/UserPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";


// Here we import our components
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";


// Here we create our router and tell it whats pages to render at what path
const router = createBrowserRouter([
  // These are the three routes!
  {
    path: "/",
// Putting our NavBar as the main component will causes the children to render in the <Outlet />
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> }, 
      { path: "/clubs", element: <ClubsPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/clubs/:clubid", element: <ClubPage /> },
      { path: "/clubs/:clubid/createproject", element: <CreateprojectPage/> },
      { path: "/clubs/:clubid/updateclub", element: <UpdateClubPage/>},
      { path: "/clubs/:clubid/projects/:projectid", element: <ProjectPage /> },
      { path: "/clubs/:clubid/projects/:projectid/updateproject", element: <UpdateProjectPage /> }, 
      { path: "/createclub", element: <CreateclubPage/> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    {/* Here we wrap our app in the router provider so the pages render */}
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);