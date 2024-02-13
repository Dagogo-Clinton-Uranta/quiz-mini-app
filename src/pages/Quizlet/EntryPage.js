import { Container } from '@mui/material';
import LogoImg from '../../assets/img/logo.png';

function EntryPage() {
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '95vh', 
          backgroundColor: 'white',
          border: '1px solid lightgray',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <img src={LogoImg} alt="Logo" style={{ marginBottom: '20px' }} /> 
        <h1 style={{ marginTop: '70px' }}>Ver 1.0</h1>
      </Container>
    </>
  );
}

export default EntryPage;
