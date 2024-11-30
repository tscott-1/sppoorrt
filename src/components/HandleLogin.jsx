import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login if token doesn't exist
      navigate('/login');
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default HandleLogin;