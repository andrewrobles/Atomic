import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const SignOutButton = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('idToken')
        navigate('/auth')
    };

    return (
        <Button color="inherit" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}

export default SignOutButton;