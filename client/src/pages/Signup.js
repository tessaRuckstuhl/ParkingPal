import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Signup = () => {
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
    await loading(4000);
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
      const response = await AuthService.signup(user);
      const { token } = response?.data;
      localStorage.setItem('token', token);
      setJwt(token);
      navigate('/dashboard');
    } catch (error) {
      alertToggle(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    if (jwt || jwt !== '') {
      return navigate('/dashboard');
    }
  }, [jwt, navigate]);

  return (
      <div >
        <Typography component="h1" variant="h5">
          Sign Up Page
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
            autoComplete="current-password"
            onChange={(e) => handleChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {
            showAlert
              ? <Alert style={{ whiteSpace: 'pre-line' }} severity="warning">{alertText}</Alert>
              : null
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {'Have an Account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
  );
};

export default Signup;
