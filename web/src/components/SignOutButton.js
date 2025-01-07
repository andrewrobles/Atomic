import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const SignOutButton = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        console.log('sign out')
        localStorage.removeItem('token')
        navigate('/auth')
    };

    return (
        <Button color="inherit" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}

export default SignOutButton;