import { Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from 'src/redux/actions/auth.action';
import LogoImg from '../assets/img/logo.png';
import { useDispatch } from 'react-redux';

function ExternalLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleLoginFxn = (navigate) => {
    dispatch(signInWithGoogle(navigate));
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray', mt: 2 }}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '1rem',
            paddingBottom: '40px',
          }}
        >
          <center>
          <img src={LogoImg} alt="Logo" style={{ marginBottom: '20px', width: '150px', height: '60px' }} />
          </center>
          <hr/>
        </Grid>

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
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#CC4436', color: '#FFFFFF', width: '100%', height: '65px', padding: '10px', marginLeft: '40px', marginRight: '40px', fontSize: '18px' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              GMAIL
            </Button>
          </Grid>

          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
              variant="contained"
              style={{ backgroundColor: '#485FEB', color: '#FFFFFF', width: '100%', height: '65px', padding: '10px', marginLeft: '40px', marginRight: '40px', fontSize: '18px' }}
              onClick={() => {
                navigate('/register');
              }}
            >
              FACEBOOK
            </Button>
          </Grid>

          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
              variant="contained"
              style={{ backgroundColor: '#161441', color: '#FFFFFF', width: '100%', height: '65px', padding: '10px', marginLeft: '40px', marginRight: '40px', fontSize: '18px' }}
              onClick={() => {
                navigate('/login');
              }}
            >
              EMAIL
            </Button>

            <br />
            <br />
            <br />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '1rem',
            paddingBottom: '40px',
          }}
        >
          <center>
            <p
              style={{ textDecoration: 'underline', cursor: 'pointer'}}
              onClick={() => {
                navigate('/login');
              }}
            >
             Already Registered? Login
            </p>
            <div style={{borderBottom: "4px solid black", marginTop: '10px'}}></div>
            <br />
          </center>
        </Grid>
      </Container>
    </>
  );
}

export default ExternalLoginPage;
