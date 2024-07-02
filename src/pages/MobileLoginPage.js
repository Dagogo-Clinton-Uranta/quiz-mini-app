import { Container, Grid, TextField, Typography, TextareaAutosize, Button, Paper, Divider, Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png';
import startQuote from 'src/assets/images/startQuote.png';
import endQuote from 'src/assets/images/endQuote.png';
import bonLogo from 'src/assets/images/bonlogo.png';
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import Alert from '@mui/material/Alert';

import { uploadUserSettings } from 'src/redux/actions/group.action';
import { signin, signInWithGoogle } from 'src/redux/actions/auth.action';
import { logoutSuccess } from 'src/redux/reducers/auth.slice';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import LogoImg from '../assets/img/logo.png';

function MobileLoginPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({ selectedFile: [], selectedFileName: [] });
  const [selectedFile2, setSelectedFile2] = useState({ selectedFile2: [], selectedFileName2: [] });
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companySize, setCompanySize] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const existingUser = {
    email,
    password,
  };

  const { user, error } = useSelector((state) => state.auth);

  console.log('error is', error);

  const LoginFxn = (user, navigate) => {
    if (!email || !password) {
      notifyErrorFxn('Please make sure to fill in all fields');
    } else {
      dispatch(signin(user, navigate));
    }
  };

  const handleselectedFile = (event) => {
    console.log('these are the picture deets!', event.target.files[0]);
    setSelectedFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });

    setFile(URL.createObjectURL(event.target.files[0]));
    setFileSize(event.target.files[0].size);
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray', mt: 10 }}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '1rem',
            paddingBottom: '0px',
          }}
        >
            <center>
            <img src={LogoImg} alt="Logo" style={{ marginBottom: '20px', width: '150px', height: '60px' }} />
          </center>
          <hr />
        </Grid>

        {error && error.length && (
          <div>
            <Alert
              severity="error"
              color="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  style={{ fontSize: '15px' }}
                  onClick={() => {
                    dispatch(logoutSuccess());
                  }}
                >
                  <b>X</b>
                </Button>
              }
            >
              <p style={{ fontSize: '14px' }}>
                <b>{error}</b>
              </p>
            </Alert>
            <br />
          </div>
        )}

        <Grid
          container
          item
          xs={12}
          spacing={2}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: error ? '20px' : '20px',
            marginBottom: '40px',
          }}
        >
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Email address"
              type="email"
              autoComplete="current-email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#CC4436', color: '#FFFFFF', width: '75%', height: '3rem', fontSize: '15px' }}
              onClick={() => {
                //navigate('/dashboard/home', { replace: true });
                //return;
                LoginFxn(existingUser, navigate);
              }}
            >
              SUBMIT
            </Button>

            <br />
            <br />
            <br />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingTop: '1rem',
              paddingBottom: '10px',
            }}
          >
            <br />
            <center>
              <p>
                {' '}
                Don’t have an account? &nbsp;{' '}
                <span
                  onClick={() => {
                    navigate('/register');
                  }}
                  style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Register 
                </span>{' '}
              </p>
            </center>
            <Divider variant="fullWidth" sx={{ backgroundColor: '#000000', width: '100%', mt: 0.5 }} />

          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MobileLoginPage;
