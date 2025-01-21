import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signInDemoUser = () => {
        localStorage.setItem('idToken', 'demo')
        navigate('/')
    };

    signInDemoUser();
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default Auth;