import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Stack, Box, Button } from '@mui/material';
import CofettiImg from '../../assets/img/confetti.png';
import CalenderImg from '../../assets/img/calendar.png';
import { useNavigate } from 'react-router-dom';

const QuizletDetailsPage = () => {
  const navigate = useNavigate();
   const data = [{title: 'Dissociation et produit ionique', img: CofettiImg, amt: 91}, {title: 'Dissociation et produit ionique', img: CofettiImg, amt: 73},
   {title: 'Dissociation et produit ionique', img: CalenderImg, amt: 92}, {title: 'Dissociation et produit ionique', img: CalenderImg, amt: 47},];
  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
      <br/><br/>
          <center>
            <h1 style={{fontSize: '20px', fontWeight: 700, }}>Welcome Francis,</h1>
          </center>
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '1rem' }}
      >
        <center>
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '22px',
              borderBottom: '4px solid #553A76',
              width: '70%',
              marginTop: '30px',
            }}
          >
            QCM Quiz - English
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
          <>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              width: '100%',
              borderBottom: '3px solid #553A76',
            }}
          >
            Q1. What is the element involved?
          </p>
          {data.map((item, index) => (
    <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #00000026',
                padding: '10px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="radio"
                    name="itemSelection"
                    value={index}
                    style={{ marginRight: '10px', }}
                />
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem',                  }}>
                    {item.title}
                </Typography>
            </div>
        </div>
    </Grid>
))}

          </>
      </Grid>

      <Stack item xs={12} spacing={2} sx={{p: 2, mb: 2}}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-basic"
              label=""
              type="title"
              onChange={(e) => {
              }}
            />
              <Box sx={{pl: 3, pr: 3}}>
              <Button
                onClick={() => {
                  navigate('/dashboard/quiz-content');
                 }}
              variant="contained"
              style={{ backgroundColor: '#CC4436', color: '#FFFFFF', width: '100%', height: '55px', padding: '10px', fontSize: '18px' }}
            >
              Next
            </Button>
              </Box>
          </Stack>

          {data.slice(0, 2).map((item, index) => (
    <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '20px',}}>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid #00000026',
                padding: '10px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem'}}>
                    Q1 {item.title}
                </Typography>
            </div>
        </div>
    </Grid>
))}
       <Box sx={{pl: 4, pr: 4}}>
       <Button
       onClick={() => {
        navigate('/dashboard/quiz-content');
       }}
              variant="contained"
              style={{ backgroundColor: '#CC4436', color: '#FFFFFF', width: '100%', height: '55px', padding: '10px', fontSize: '18px' }}
            >
              Submit
            </Button>
       </Box>

      <br />
      <br />
      <br />
    </Container>
  );
};
export default QuizletDetailsPage;
