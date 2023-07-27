import React,{useState,useEffect,useRef} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Avatar from '@mui/material/Avatar';

import samplePdf from 'src/assets/images/sample.pdf'
import profile from 'src/assets/images/profile.jpeg'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ReactPlayer from 'react-player'
import { Document, Page ,pdfjs} from 'react-pdf';
import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import LogoSwitch from './LogoSwitch';

import {AiOutlineDownload} from "react-icons/ai";

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifyInfoFxn,notifySuccessFxn } from 'src/utils/toast-fxn';
import Modal from '@mui/material/Modal';

import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'

import db from '../browserDb/db'

import { blobToDataURL,dataURLToBlob,imgSrcToBlob } from 'blob-util'

function SelectedCoursePage() {
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 




  const topics = [
    {title:"Chemie ",author:"Sidiki...",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet...",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj... ",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki...",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode...",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki...",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]

/*PDF MANIPULATION LOGIC*/
  const [numPages, setNumPages] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(/*{ numPages }*/) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

/*PDF MANIPULATION LOGIC END */

/*MODAL MANIPULATION LOGIC */

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {doVideoActions()}
  const handleClose = () => {setOpen(false);setVideoTime(false)};


  const [openPdf, setOpenPdf] = React.useState(false);
  const handleOpenPdf = () => {setOpenPdf(true)}
  const handleClosePdf = () => {setOpenPdf(false)};

/*MODAL MANIPULATION LOGIC */


 /*video manipulation logic */
 
  const [videoTime,setVideoTime] = useState(false)
  const [fullScreen, setFullScreen] = useState(false);


  
  const videoRef = useRef(true)
 

  const handleEsc = (event) => {
   
    window.removeEventListener('fullscreenchange', handleEsc)
    setTimeout(()=>{setOpen(false); setFullScreen(!fullScreen); setVideoTime(false)},10)
    
  };


  const doVideoActions = () => {
    setOpen(true)
    
    setTimeout(
     ()=> {
    
    setVideoTime(!videoTime)
    
     if(!videoTime){
      findDOMNode(videoRef.current).requestFullscreen()
      }
    },10) 

    setTimeout(()=>(window.addEventListener('fullscreenchange', handleEsc)),1000)
  }

  
  
  
  useEffect(()=>{
 
    if(open === false){
      setTimeout(()=>(window.removeEventListener('fullscreenchange', handleEsc)),10)
    }

  },[open])

  /*video manipulation logic end */

 

/*SAVING TO BROWSER DATABASE */

const [name,setName] = useState("Sample name")
//const [fileObject,setFileObj] = useState("ababa namna")
const [status,setStatus] = useState(false)
const [view,setView] = useState(new Blob())
const [loading,setLoading] = useState("Not loafing")
const URLSound = window.URL || window.webkitURL



async function saveCourse() {
  try {
    
    notifyInfoFxn("Your download has begun, you will be alerted once it is completed...")

   const res = await fetch("https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4")

  let returnImage= res.blob()
  
  
  returnImage.then((item)=>{ setView(item);setLoading(true);
    let second = item


      const id =db.savedCourses.add({
        courseName:"Video 1",
        fileObject:item
     
      });
  
      setStatus(`Media file ${name} successfully added. Got id ${id}`);
      setLoading(false)
      notifySuccessFxn("Successfully Downloaded !")
      console.log("status is now:",status)
      console.log("loading is now:",loading)


    return second
    })/*.then((third)=>{
      setView(third)
}
  ).then(()=>{
  setTimeout(()=>
  
  {if(view.size > 0 ){
    const id =db.savedCourses.add({
      courseName:"Video 1",
      fileObject:view
   
    });

    setStatus(`Media file ${name} successfully added. Got id ${id}`);
    setLoading(false)
    notifySuccessFxn("Successfully Downloaded !")
    console.log("status is now:",status)
    console.log("loading is now:",loading)
  }
  else{
    notifyErrorFxn("Something went wrong, please try again.")
  }
 } , 4000)




})*/
  

  } catch (error) {
    setStatus(`Failed to add ${name}: ${error}`);
    notifyErrorFxn(`Failed to add media: please check your connction and try again.`)
    console.log("status is now:",status)

  }
}



/*SAVING TO BROWSER DATABASE END */

  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 




  

     {/*PDF MODAL */}
    <Modal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           
     {/* <iframe src={samplePdf} style={{width:"100%",height:"100%"}}  frameborder="0"></iframe>*/}
       
        {/*<Document  className="pdfCenter"  file={samplePdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page className="pdfCenter" pageNumber={pageNumber} />
       </Document>*/}

       <MobilePDFReader isShowHeader={false} isShowFooter={false} url={samplePdf}/>
     
      
        </Box>
  </Modal>

     {/*VIDEO MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
         <ReactPlayer   
                width="100%"
                height="100%"
                id="full-screenVideo"                                              
                className="videoFrame"
                url={"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4"}
                //light={thumbnail}
                playing={true}
                playIcon={' '}
                controls
                ref={videoRef}
              //onClickPreview = {()=>{setTouch(false);}}
               
             />
        </Box>
      </Modal>
    

    <Grid container xs={12} style={{marginTop:"2rem",padding:"1.5rem", background:`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(${chem})`,borderRadius:"0.5rem",}}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem",color:"white"}}>
      
      <h3 style={{fontSize:"0.9rem"}}>CHIMIE TSE/TSM</h3>
      
       <p style={{marginTop:"0.5rem"}}>
       Conçu par le MENA en collaboration avec L’INRAP, 
       ce programme de chimie Terminales est un programme harmonisé.
       </p>

       <p style={{marginTop:"2rem"}}>
         <p style={{marginBottom:"1rem"}}> Ce cours couvre ce qui suit:</p>
        <ol>

          <li>1.) La notion de pH de quantité et concentration</li>
          <li>2.) Un acide fort, une base forte, un acide </li>
          <li>3.) La constante d’acidité</li>
          <li>4.) L’évolution des systèmes</li>
          <li>5.) La stéréochimie,</li>
        </ol>
       </p>

       <p style={{marginTop:"2rem",display:"flex",gap:"1rem",justifyContent:"flex-start"}}>
        <Avatar alt="placeholder avatar" sx={{ width: 48, height: 48 }} src={profile}/>
        
        <p>
          BAFODE BANGOURA
          <br/>
          Terminales
        </p>
       </p>
    

      </Grid>
    </Grid>
   
    <center>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center",marginBottom:"2rem",marginTop:"2rem",flexDirection:"column",gap:"1rem",border:"1px solid lightgrey",width:"85%",padding:"1rem",borderRadius:"0.5rem"}}>
   
    <center >
    <b style={{fontSize:"1.2rem"}}> 30,000 GNF</b> <s>50,000 GNF</s>
    </center>
    
    <p >
    Achat unique, accès à toutes les leçons
    </p>

    <Button   variant="contained" 
            style={{ backgroundColor: "red",color:"#FFFFFF", fontSize:"0.9rem",width:"100%",
            padding: '8px'}}
            
            >
            Acheter maintenant
            </Button>
   
    </Grid>
    </center>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>Curriculum</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Chapitre 1: Acide et base en solution aqueuese
     <PictureAsPdfIcon onClick={handleOpenPdf} style={{fontSize:"2.2rem"}} />
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch audioFile={soundBytes2}/> &nbsp; 1.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p  style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch audioFile={soundBytes2}/> &nbsp; 2.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}} ><LogoSwitch audioFile={soundBytes2}/> &nbsp; 3.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p  style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch audioFile={soundBytes2}/> &nbsp; 4.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}><LogoSwitch audioFile={soundBytes2}/> &nbsp; 5.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"0.3rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}} ><LogoSwitch audioFile={soundBytes2}/> &nbsp; 6.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>


    <Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
    <p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
    <PictureAsPdfIcon  onClick={handleOpenPdf} style={{color:"blue",fontSize:"2.2rem"}} />
     QCM - Chapitre 1
     </p>
     <Divider/>
    
    </Grid>


   </Grid>


   <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",display: 'flex',marginLeft:"0.4rem", justifyContent: 'space-between',fontWeight:"bold",fontSize:"1rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Chapitre 2: Acide et base en solution aqueuese
     <PictureAsPdfIcon onClick={handleOpenPdf} style={{fontSize:"2.2rem"}} />
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 1.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>

   
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 2.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00<AiOutlineDownload onClick={()=>{saveCourse()}} style={{fontSize:"1.5rem"}}/></p>
    </Grid>




    <Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
    <p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
    <PictureAsPdfIcon  onClick={handleOpenPdf} style={{color:"blue",fontSize:"2.2rem"}} />
     QCM - Chapitre 2
     </p>
     <Divider/>
    
    </Grid>
   </Grid>
       

   <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"20px",gap:"10px" }}>
  

  <Button   variant="contained" 
  style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
  padding: '8px'}}
  onClick={()=>{navigate('/dashboard/saved-courses')}}
  >
  View My Courses
  </Button>


</center>

</Container>
    </>
  );
}

export default SelectedCoursePage;