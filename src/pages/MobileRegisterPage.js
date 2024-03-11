import {
  Container,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  Paper,
  Divider,
  Box,
  Select,
  InputBase,
  MenuItem,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import DEFAULTIMG from '../assets/images/rec.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png';
import Alert from '@mui/material/Alert';
import { signup } from 'src/redux/actions/auth.action';
import { logoutSuccess } from 'src/redux/reducers/auth.slice';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { FaCaretDown } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core';
import LogoImg from '../assets/img/logo.png';
import ProfileImg from '../assets/img/profile.png';
import { CardMedia } from  '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    color: 'black',
  },
  searchInput: {
    background: '#FFFFFF',

    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '100%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },

  select: {
    '&:before': {
      borderColor: 'black',
    },
    '&:after': {
      borderColor: 'black',
    },
  },
  icon: {
    fill: 'black',
  },
}));

function MobileRegisterPage() {
  const classes = useStyles();

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [facebook, setFacebook] = useState('');
  const [affiliate, setAffiliate] = useState('');
  const [pvExamen, setPvExamen] = useState('');
  const [classOption, setClassOption] = useState('');
  const [telephone, setTelephone] = useState('');
  const [schoolOrigin, setSchoolOrigin] = useState('');


  const [page2, setPage2] = useState(false);
  const [page1, setPage1] = useState(true);

  const { user, error } = useSelector((state) => state.auth);

  const newUser = {
    email,
    firstName,
    lastName,
    password,
    facebook,
    affiliate,
    pvExamen,
    telephone,
    classOption,
    schoolOrigin,
  };

  const registerFxn = (user, navigate) => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !facebook ||
      !affiliate ||
      !pvExamen ||
      !telephone ||
      !classOption ||
      !schoolOrigin ||
      !classOption ||
      !schoolOrigin
    ) {
      notifyErrorFxn('Please make sure to fill in all fields');
    } else {
      dispatch(signup(user, navigate));
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
      {page1 && (
        <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray', mt: 2}}>
          <center>
            <img src={LogoImg} alt="Logo" style={{ marginBottom: '20px', width: '150px', height: '60px' }} />
          </center>
          <hr />
          <br />
          <h1 style={{ fontSize: '18px', fontWeight: 700 }}>
            <b>MY PROFILE</b>
          </h1>
          <div style={{ borderBottom: '3px solid black', marginTop: '10px', marginBottom: '10px' }}></div>
          <center>
            
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '140px' }}
            component="img"
            height="120"
            width="140"
            image={file ? file: DEFAULTIMG}
            alt="IMG"
          />
          <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#000000', marginTop: '15px' }}>
            <b>CHANGE</b>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleselectedFile}
            />
          </Button>
        </div>
            
            {/*<img src={ProfileImg} alt="profile" style={{ width: '100px', height: '100px' }} />*/}
          
          </center>
          {error && (
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
                  <b>{error.errorMessage}</b>
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
              marginTop: error && error.errorMessage ? '20px' : '20px',
              marginBottom: '40px',
            }}
          >
            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                Name
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                type="text"
                autoComplete="full name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                Username
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                type="text"
                autoComplete="full name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                Facebook
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                type="text"
                autoComplete="full name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                State
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                type="text"
                autoComplete="full name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                Class
              </Typography>
              <Select
                sx={{ width: '100%', border: '1px solid #0000001A', borderRadius: '5px', height: '50px' }}
                id="outlined-basic"
                onChange={(e) => setFirstName(e.target.value)}
                displayEmpty
                input={<InputBase />}
              >
                <MenuItem value="" disabled>
                  Select class
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }} sx={{pl: 2, pr: 2}}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: '18px', fontWeight: 700, color: '#404040', marginBottom: '5px' }}
              >
                Phone Number
              </Typography>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-basic"
                type="text"
                placeholder="+234"
                autoComplete="full name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
              <br/>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{pl: 2, pr: 2}}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#CC4436',
                    color: '#FFFFFF',
                    width: '100%',
                    height: '3rem',
                    fontSize: '15px',
                  }}
                  onClick={() => {
                    if (email && firstName && lastName && password) {
                      setPage2(true);
                      setPage1(false);
                    } else {
                      notifyErrorFxn('please fill in all fields before proceeding!');
                    }
                  }}
                >
                  SAVE
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#161441',
                    color: '#FFFFFF',
                    width: '100%',
                    height: '3rem',
                    fontSize: '15px',
                  }}
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
      <br/><br/>
      {page2 && (
        <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray' }}>
          <Button
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              marginTop: '20px',
              width: '6rem',
              height: '3rem',
              fontSize: '15px',
            }}
            onClick={() => {
              setPage2(false);
              setPage1(true);
            }}
          >
            Back
          </Button>

          {firstName && lastName && (
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingTop: '0rem',
                paddingBottom: '0px',
              }}
            >
              <br />
              <h1>Bienvenue,</h1>
              <p style={{ color: 'gray' }}>{firstName + ' ' + lastName}</p>
            </Grid>
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
              marginTop: '10px',
              marginBottom: '40px',
            }}
          >
            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                {' '}
                <span>REGISTRATION (2)</span> <FaCaretDown />
              </p>
              <Divider variant="fullWidth" sx={{ backgroundColor: '#000000', width: '100%' }} />

              <Grid item xs={12} md={8} lg={6}>
                <Typography variant="p" component="p">
                  Profile Picture
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                    border: '1px solid grey',
                  }}
                >
                  <center>
                    <Typography color="textPrimary" variant="h3" component="p">
                      <Button component="label" style={{ backgroundColor: 'white' }}>
                        <img src={UPLOADIMG} width="100px" height="100px" />
                        <input type="file" style={{ display: 'none' }} onChange={handleselectedFile} />
                      </Button>
                    </Typography>
                    <Typography color="textPrimary" variant="p" component="p">
                      Browse files to upload
                    </Typography>
                  </center>
                </Paper>
                <p>{selectedFile?.selectedFileName}</p>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder=" "
                variant="outlined"
                multiline
                maxRows={2}
                //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                label="Facebook"
                value={facebook}
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder=" "
                variant="outlined"
                multiline
                maxRows={2}
                //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                label="Identifiant Affilié"
                value={affiliate}
                onChange={(e) => {
                  setAffiliate(e.target.value);
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder=" "
                variant="outlined"
                multiline
                maxRows={2}
                value={schoolOrigin}
                onChange={(e) => {
                  setSchoolOrigin(e.target.value);
                }}
                label="Ecole d'origine"
              />
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder="e.g 6eme Annee, 10eme Annee,Terminales"
                variant="outlined"
                multiline
                maxRows={1}
                sx={{ height: '32px', fontSize: '0.5rem' }}
                value={classOption}
                onChange={(event) => {
                  setClassOption(event.target.value);
                }}
                label="Classe et option"
              />

              {/*<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="hi-label"
          id="hi"
          value={classOption}
          label="Classe et option"
          onChange={(event) => {
            setClassOption(event.target.value);
          }}
        >
       
      
  <MenuItem  value={"6eme Annee"}>6eme Annee</MenuItem>
  <MenuItem   value={"10eme Annee"}>10eme Annee</MenuItem>
  <MenuItem   value={"Terminales"}>Terminales</MenuItem>

       
        </Select>*/}
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '2rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder=" "
                variant="outlined"
                multiline
                maxRows={2}
                value={pvExamen}
                onChange={(e) => {
                  setPvExamen(e.target.value);
                }}
                label="PV examen"
              />
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '1rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <TextField
                fullWidth
                placeholder=" "
                variant="outlined"
                multiline
                maxRows={2}
                value={telephone}
                onChange={(e) => {
                  setTelephone(e.target.value);
                }}
                label="Numero de Telephone"
              />
            </Grid>

            <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#000000', color: '#FFFFFF', width: '75%', height: '3rem', fontSize: '15px' }}
                onClick={() => {
                  registerFxn(newUser, navigate);
                }}
              >
                SUBMIT
              </Button>

              <br />
              <br />
              <br />
            </Grid>
          </Grid>

          {error && (
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
                  <b>{error.errorMessage}</b>
                </p>
              </Alert>
              <br />
            </div>
          )}

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
                Vous avez déjà un compte? &nbsp;{' '}
                <span
                  onClick={() => {
                    navigate('/external-login');
                  }}
                  style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Se connecter
                </span>{' '}
              </p>
            </center>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default MobileRegisterPage;
