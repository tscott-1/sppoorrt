import CreateprojectForm from "../components/CreateprojectForm";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateprojectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          // Redirect to login if token doesn't exist
          navigate("/login");
        }
      }, [navigate]);
    return <CreateprojectForm />;
}

export default CreateprojectPage;