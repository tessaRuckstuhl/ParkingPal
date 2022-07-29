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
import moment from 'moment'
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    surname: '',
    firstName: '',
    birthdate: '1998-01-01',
  });

  const [checked, setChecked] = useState(false);
  const { jwt, setJwt } = useContext(MainContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const navigate = useNavigate();

  const alertToggle = async (msg) => {
    setAlertText(msg);
    setShowAlert(true);
    await loading(4000);
    setShowAlert(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = { ...formData, birthdate: new Date(formData.birthdate) };
      const response = await AuthService.signup(user);
      const { token } = response?.data;
      localStorage.setItem('token', token);
      setJwt(token);
    } catch (error) {
      alertToggle(error?.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (jwt || jwt !== '') {
      return navigate('/personal');
    }
  }, [jwt, navigate]);

  const textFieldConfigs = {
    variant: 'outlined',
    margin: 'normal',
    InputLabelProps: { shrink: true, required: true },
    onChange: (e) => handleChange(e),
    fullWidth: true,
    required: true,
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="w-1/2">
        <div className="text-2xl font-bold mb-7">
          Sign up to <span className="text-purple">ParkingPal</span>
        </div>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="flex space-x-5">
            <TextField
              {...textFieldConfigs}
              name="firstName"
              label="Name"
              id="firstName"
              autoComplete="given-name"
            />
            <TextField
              {...textFieldConfigs}
              name="surname"
              label="Surname"
              id="surname"
              autoComplete="family-name"
            />
          </div>
          <TextField
            {...textFieldConfigs}
            id="username"
            label="Email"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            {...textFieldConfigs}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <TextField
            {...textFieldConfigs}
            InputProps={{inputProps: { max: moment(new Date()).format('YYYY-MM-DD') } }}
            name="birthdate"
            label="Birthdate"
            id="birthdate"
            type="date"
            defaultValue="1998-01-01"
          />

          <FormControlLabel
            control={
              <Checkbox
                value="accept"
                checked={checked}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={
              <div>
                <span>I accept the </span>
                <Link to={'/terms'}>terms of use</Link>
                <span> and </span>
                <Link to={'/privacy'}>privacy policy</Link>
              </div>
            }
          />
          {showAlert ? (
            <Alert style={{ whiteSpace: 'pre-line' }} severity="warning">
              {alertText}
            </Alert>
          ) : null}
            <Button               
              disabled={Object.values(formData).filter((o) => o == '').length > 0 || checked == false}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          <div className="flex justify-end mt-1">
            <Link href="/login" variant="body2">
              {'Have an Account? Sign In'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
