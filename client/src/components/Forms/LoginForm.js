
import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../contexts/MainContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { jwt, setJwt } = useContext(MainContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const navigate = useNavigate();

  const alertToggle = async(msg) => {
    setAlertText(msg);
    setShowAlert(true);
    await loading(3000);
    setShowAlert(false);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password
      };
      const response = await AuthService.login(user);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setJwt(token);
      navigate('/personal');
    } catch (error) {
      console.log(error)
      alertToggle(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (jwt || jwt !== '') {
      return navigate('/personal');
    }
  }, [jwt, navigate]);
  return (
      <div className='flex flex-col items-center' >
        <div className='w-1/2'>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoComplete="username"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => handleChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {
            showAlert
              ? <Alert severity="error">{alertText}</Alert>
              : null
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </div>
  );
};

export default LoginForm;
