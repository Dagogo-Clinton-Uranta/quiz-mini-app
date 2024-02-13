import React, { useState } from 'react';
import { Container, Grid, Typography, } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CofettiImg from '../../assets/img/confetti.png';
import CalenderImg from '../../assets/img/calendar.png';

const QuizletHomePage = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
   const data = [{title: 'Mathematics', img: CofettiImg, amt: 91}, {title: 'English Language', img: CofettiImg, amt: 73},
   {title: 'Geography', img: CalenderImg, amt: 92}, {title: 'Fine Art', img: CalenderImg, amt: 47}, {title: 'Agricultural Science', img: CofettiImg, amt: 69}, {title: 'Economics', img: CofettiImg, amt: 41},  {title: 'Computer Science', img: CalenderImg, amt: 100}, {title: 'Fine Art', img: CofettiImg, amt: 51}];
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
              borderBottom: '2px solid #553A76',
              width: '150px',
              marginTop: '30px',
            }}
          >
            My Subjects
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
          <>
            {data.map((item, index) => (
              <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px', cursor: 'pointer'}} onClick={() => {
                navigate('/dashboard/quiz-details');
              }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '3px solid black',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.img}  width={40} height={40}/>
                    &nbsp; &nbsp; &nbsp;
                    <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    {item.title}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ marginRight: '1rem', color: item.amt > 99 ? 'green' : item.amt > 50 ? 'black' : '#CC4436' }}>
                    {item.amt}%
                    </Typography>
                  
                  </div>
                </div>
              </Grid>
            ))}
          </>
      </Grid>

      <br />
      <br />
      <br />
      {/* <div>
        {cart?.length ? (
          <Grid
            item
            xs={12}
            style={{
              position: 'relative',
              display: 'flex',
              width: '23rem',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '0.8rem',
            }}
          >

              <Button
                  type="button"
                  onClick={()=>{navigate('/dashboard/payment-options')}}
                  disabled={isLoading}
                  variant="contained"
                  style={{
                    backgroundColor: '#CC4436',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingRight: '30px',
                    paddingLeft: '30px',
                  }}
                >
                  Make Payment
                </Button>

          </Grid>
        ) : null}
      </div> */}
    </Container>
  );
};
export default QuizletHomePage;
