import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Checkbox, Typography, IconButton, Button } from '@mui/material';
import { fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse } from 'src/redux/actions/cart.action';
import MTNLOGO from '../assets/images/MTN-logo.png';
import PAYCARDLOGO from '../assets/images/paycard-logo.png';
import ORANGELOGO from '../assets/images/orange-logo.png';
import LockIcon from '@mui/icons-material/Lock';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import axios from 'axios';
import * as uuid from 'uuid';
import { useNavigate } from 'react-router-dom';

const PaymentOptions = () => {
  const [pcChecked, setPcChecked] = useState(false);
  const [mtnChecked, setMtnChecked] = useState(false);
  const [orangeChecked, setOrangeChecked] = useState(false);
  const [momoToken, setMomoToken] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { purchasedCourses } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);

  const handleOrangeCheckBox = () => {
    setOrangeChecked(true);
    setMtnChecked(false);
    setPcChecked(false);
  };

 // const momoTokenUrl = 'http://localhost:5001/api/get-token';
 // const momoRequestToPayUrl = 'http://localhost:5001/api/requesttopay';


 const momoTokenUrl = 'https://boncole-server-2.vercel.app/api/get-token'
 const momoRequestToPayUrl = 'https://boncole-server-2.vercel.app/api/requesttopay';

//  const orangeMTokenUrl = 'http://localhost:5008/api/om/get-token';
//  const orangeMPaymentUrl = 'http://localhost:5008/api/om/webpayment';
 const orangeMTokenUrl = 'https://boncole-server-2.vercel.app/api/om/get-token';
 const orangeMPaymentUrl = 'https://boncole-server-2.vercel.app/api/om/webpayment';

  useEffect(() => {
    dispatch(fetchPurchasedCourse(user?.uid));
 
  }, []);

  const handlePcCheckboxChange = () => {
    setPcChecked(true);
    setMtnChecked(false);
  };

  const handleMtnCheckboxChange = () => {
    setMtnChecked(true);
    setPcChecked(false);
  };

  const handleMtnPay = async () => {
    if(!user){
      notifyErrorFxn("You must be logged in to proceed!");
      return;
    }


     if(user && !user.phone){
      notifyErrorFxn("Please add your phone number in the profile section before you pay via mtn");
      return;
    }
     const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  
     };
       setIsLoading(true);
       axios.post(momoTokenUrl, {}, { headers })
        .then(response => {
            const access_token = response.data.access_token;
            console.log("ACCESS-TOKEN IS-->", access_token);
           axios.post(momoRequestToPayUrl, {
            amount: totalPrice,
            currency: 'GNF',
            externalId: `${uuid.v4()}`,
            payer: {
              partyIdType: 'MSISDN',
              partyId: `${user && user.phone?(user.phone).toString():null}`, //phone 08106091838
            },
            payerMessage: 'Payment for order',
            payeeNote: 'Payment for order',
            momoToken: access_token
          }).then((res) => {
              console.log("Payment completed...--->", res.data);
              let today = new Date().toLocaleDateString();

            if(/*res.data && res.data.status !== "PENDING" || res.data && res.data.status !== "FAILURE"||*/ res.data && res.data.status === "SUCCESSFUL"){
              dispatch(buyCourse(cart, user.id ?? user.uid, today, navigate, setIsLoading));
              }else{

                if(res.data && res.data.reason){notifyErrorFxn(`MTN MOMO RESPONSE - ${res.data.reason}`)}
                console.log("OUR REASON IS HEREEE---->",res.data.reason)
              }
          }).catch((error) => {
            setIsLoading(false);
            console.error('Payment Request Error:', error);
            notifyErrorFxn('Payment Request Error...');
          })
        }).catch(error => {
            // Handle errors
            setIsLoading(false);
            console.error(' Overall Error is------->', error);
            notifyErrorFxn('Failed to get token');
        });
  };


  const handleOrangePay = async () => {
    if(!user){
      notifyErrorFxn("You must be logged in to proceed!");
      return;
    }

     const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',  
     };
       setIsLoading(true);
       axios.post(orangeMTokenUrl, {}, { headers })
        .then(response => {
            const access_token = response.data.access_token;
          
           axios.post(orangeMPaymentUrl, {
            amount: totalPrice,
            currency: 'OUV', //OUV
            order_id: `${uuid.v4()}`,
            reference: "ref Merchant",
            orangeMToken: access_token
          }).then((res) => {
              console.log("RESPONSE--->", res.data);
              if (res.data.payment_url) {
                window.open(res.data.payment_url, '_blank');
              }else{
                console.log("Res", res);
                notifyErrorFxn("An error occured!");  
              }
          }).catch((error) => {
            setIsLoading(false);
            console.error('Payment Request Error:', error);
            notifyErrorFxn('Payment Request Error...');
          })
        }).catch(error => {
            setIsLoading(false);
            notifyErrorFxn('Failed to get token');
        });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
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
              fontSize: '1.3rem',
              borderBottom: '3px solid red',
              width: '250px',
              marginTop: '20px',
            }}
          >
            Payment Options
          </p>
        </center>
      </Grid>
      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Mode de Paiement
          </Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: 400, fontSize: '18px', marginTop: '15px', marginBottom: '15px' }}
          >
            Connexion sécurisée
            <IconButton style={{ marginLeft: '10px' }}>
              <LockIcon />
            </IconButton>
          </Typography>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '0px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#F4C109DB',
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Checkbox checked={mtnChecked} onChange={handleMtnCheckboxChange} />
              </Grid>
              <Grid item style={{ marginLeft: '25%' }}>
                <img src={MTNLOGO} alt="MTN Logo" style={{ width: '100px', height: '100px' }} />
              </Grid>
            </Grid>
          </Paper>
          <br />
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '1px solid black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Checkbox checked={pcChecked} onChange={handlePcCheckboxChange} />
              </Grid>
              <Grid item style={{ marginLeft: '25%' }}>
                <img src={PAYCARDLOGO} alt="PayCard Logo" style={{}} />
              </Grid>
            </Grid>
          </Paper>
          <br />
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '1px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#D85E01D1'
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Checkbox checked={orangeChecked} onChange={handleOrangeCheckBox} />
              </Grid>
              <Grid item style={{ marginLeft: '15%' }}>
                <img src={ORANGELOGO} alt="Orange Logo" style={{}} />
              </Grid>
            </Grid>
          </Paper>
          <br />
          <br />
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Commande
          </Typography>
          <br />

          {cart.map((item, index) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '0px solid #eee',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item?.title}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item?.price} GNF
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Grid>

      {
        <form id="paycard" action="https://mapaycard.com/epay/" method="POST">
          <input type="hidden" name="c" value="MjcyMDQxNzM" />
          <input type="hidden" name="paycard-amount" value={totalPrice} />
          <input type="hidden" name="paycard-description" value="Course sale" />
          <input
            type="hidden"
            name="paycard-callback-url"
            value="https://bonecole-student.netlify.app/dashboard/payment-callback"
          />

          <input type="hidden" name="paycard-redirect-with-get" value="on" />
          <input type="hidden" name="paycard-auto-redirect" value="off" />
          <input type="hidden" name="cart_data" value={JSON.stringify(cart)} />

          {/* <Button
                  type="submit"
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
                </Button>*/}
        </form>
      }

      <center
        style={{
          marginTop: '3rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {pcChecked === true ? (
          <Button
            form="paycard"
            type="submit"
            disabled={isLoading === true ? true : pcChecked === false && mtnChecked === false ? true : false}
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoading ? "Loading..." : "Pay"}
          </Button>
        ) : orangeChecked ? (
          <Button
            type="button"
            onClick={() => {
              handleOrangePay();
            }}
            disabled={isLoading === true ? true : pcChecked === false && orangeChecked === false ? true : false}
            variant="contained"
            style={{
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoading ? "Loading..." : "Pay"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              handleMtnPay();
            }}
            disabled={isLoading === true ? true : pcChecked === false && mtnChecked === false ? true : false}
            variant="contained"
            style={{
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoading ? "Loading..." : "Pay"}
          </Button>
        )}
      </center>
    </Container>
  );
};
export default PaymentOptions;