import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    TextField,
    Button,
    Snackbar,
    Container, 
    Typography,
    Box,
    IconButton
    } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Own
import {Auth} from "../../models/auth.ts";
import useSignup from "../../hooks/auth/useSignup.ts";


const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const {mutate, isSuccess, isError, error} = useSignup();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const userData: Auth = {
            name: formData.get('name'),
            password: formData.get('password'),
        };

        mutate(userData);
        setName('');
        setPassword('');
    };

    return (
        <Container>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 10,
                }}
            >
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                }}
                >
                <IconButton aria-label="goto" onClick={() => navigate(`/`)}>
                    <ArrowBackIosNewIcon color="secondary"/>
                </IconButton>
                <Typography variant="h4" color="primary">Signup</Typography>
                </Box>
                <TextField
                    name="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{minLength: 3, maxLength: 16}}/>
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputProps={{minLength: 8, maxLength: 64}}/>
                <Button type="submit" variant="contained" color="primary" sx={{marginTop: 2}}>Signup</Button>

                <Snackbar open={isSuccess} message="User created successfully"/>
                <Snackbar open={isError} message={(error as Error)?.message ?? 'An error occurred'}/>
            </Box>
        </Container>
    );
};

export default RegistrationForm;