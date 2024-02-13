import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import chem from 'src/assets/img/rec-s.png';
import l1 from 'src/assets/img/l1.png';
import pdf from 'src/assets/img/pdf.png';
import c from 'src/assets/img/c.png';
import q from 'src/assets/img/q.png';
import e from 'src/assets/img/e.png';

function QuizContentPage() {
  const navigate = useNavigate();
  const subjects = [
    { title: 'Algebra Mathematics' },
    { title: 'Geometry Mathematics' },
    { title: 'Statistics Mathematics' },
    { title: 'Calculus Mathematics' },
    { title: 'Arithmetic Mathematics' },
  ];

  const data = [
    { title: 'Content Phase 1', img: l1 },
    { title: 'Content Phase 2', img: l1 },
    { title: 'Content Phase 3', img: l1 },
    { title: 'Content Phase 4', img: l1 },
  ];

  return (
    <>
      <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem' }}>
        <Grid
          container
          xs={12}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.1)),url(${chem})`,
            borderRadius: '0.5rem',
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              marginBottom: '1rem',
              color: 'white',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', textAlign: 'center' }}>MATHEMATICS</h3>
            <div style={{ borderBottom: '2px solid white' }}></div>
            <p style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '1rem' }}>
                The Curriculum covers fundamental concepts in arithmetic, algebra. geometry and calculus. Empowering
                students with problem-solving skills essential for real world applications and lifelong learning.
              </p>
              <ol>
                <h3 style={{ fontSize: '1rem', fontWeight: 400, marginBottom: '5px' }}>Course Content</h3>
                {subjects.length > 1 &&
                  subjects.slice(1, subjects.length).map((item, index) => (
                    <li>
                      {index + 1}.&nbsp;{item.title}
                    </li>
                  ))}
              </ol>
            </p>
          </Grid>
        </Grid>

        <center>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid lightgrey',
              width: '85%',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <center>
              <b style={{ fontSize: '1.5rem', textAlign: 'center' }}>NGN 5,000</b>
            </center>

            <p>Purchase course to access content</p>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#CC4436',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                height: '50px',
                width: '100%',
                padding: '8px',
              }}
            >
              Purchase Content
            </Button>
          </Grid>
        </center>
        <br />
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, paddingBottom: '5px' }}>Content</h3>
          <div style={{ borderBottom: '3px solid #000000' }}></div>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              style={{ paddingTop: '0.5rem', marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => {}}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #00000026',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: '#CC4436' }} alt="">
                    <img src={c} width={15} height={24} />
                  </Avatar>
                  &nbsp; &nbsp; &nbsp;
                  <Typography variant="body1" style={{ fontSize: '1rem' }}>
                    {item.title}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={pdf} width={28} height={35} />
                </div>
              </div>
            </Grid>
          ))}
        </div>
        <br />
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, paddingBottom: '5px' }}>Quizzes</h3>
          <div style={{ borderBottom: '3px solid #000000' }}></div>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              style={{ paddingTop: '0.5rem', marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => {}}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #00000026',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: '#CC4436' }} alt="">
                    <img src={q} width={15} height={24} />
                  </Avatar>
                  &nbsp; &nbsp; &nbsp;
                  <Typography variant="body1" style={{ fontSize: '1rem' }}>
                    QCM - Quiz {index}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={pdf} width={28} height={35} />
                </div>
              </div>
            </Grid>
          ))}
        </div>
        <br />
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, paddingBottom: '5px' }}>Exams</h3>
          <div style={{ borderBottom: '3px solid #000000' }}></div>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              style={{ paddingTop: '0.5rem', marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => {}}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #00000026',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ backgroundColor: '#CC4436' }}>
                    <img src={e} width={12} height={20} />
                  </Avatar>
                  &nbsp; &nbsp; &nbsp;
                  <Typography variant="body1" style={{ fontSize: '1rem' }}>
                    2019 Past Exam
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={pdf} width={28} height={35} />
                </div>
              </div>
            </Grid>
          ))}
        </div>
        <Container maxWidth="xs">
          <Grid item xs={12}>
            <center style={{ position: 'relative' }}></center>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default QuizContentPage;
