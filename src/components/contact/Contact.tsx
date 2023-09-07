"use client";
import React, { MouseEvent } from 'react';
// import {ThemeProvider} from 'next-themes';
import {GeneralProviderNoAccount} from "@context/GeneralContext";
import Link from "next";
import styles from './contact.module.css';
import { Grid, Container, Typography, Stack, Fab } from '@mui/material';
import RequestForm from './RequestForm';
import GetGenInfo from './GetGenInfo';
import UploadCV from './UploadCV';
import Image from 'next/image';
import WeChooseUs from './WeChooseUs';

type generalInfoType = {
  id: number,
  name: string,
  address: string,
  cell: string,
  country: string,
  provState: string,
  city: string,
  postal: string,
  extra: string,
  siteArray: string[]
}
type mediaLinkType={
  name:string,
  link:string
}

const Contact = () => {
  
  const [open,setOpen]=React.useState<boolean>(false);
  const staticImage =process.env.NEXT_PUBLIC_aws;
  const webService = `${staticImage}/webService.png`;
  const bgImage:object={
    backgroundImage:`url(${webService})`,
    backgroundSize:"100% 100%",
    backgroundPosition:"50% 50%"
  }
  React.useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
    }
  },[]);


  const handleProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!open){
    setOpen(true);
    }else{
      setOpen(false);
    }

  }

  return (
    <GeneralProviderNoAccount>
    {/* <ThemeProvider attribute="class"> */}
    <Container maxWidth="xl" className="mx-0 dark:bg-black dark:text-white bg-white text-black mt-1 lg:mx-auto lg:container" >

      
      <Grid container spacing={{md:3,sm:0}}>
        <Grid
          item xs={12} sm={6} md={6}
          className={styles.childGrid}
          style={bgImage}
        >
          <div className={`bg-[rgba(0,0,255,.3)] p-3 ${styles.hello}`}>
          <h1 className={styles.fontStyleCt}>Hello.</h1>
          <h3 className="my-2 text-white text-3xl">How can we help?</h3>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className={styles.childGridForm} sx={{ display: "flex", flexDirection: "column" }}>
          <RequestForm />
        </Grid>
      </Grid>
      <section className="flex flex-col justify-center items-center lg:mx-auto">
        <div className={styles.hr_line} />
        
          {!open ?
           
           <button
          onClick={(e) => handleProject(e)}
          className="shadow-lg shadow-blue hover:shadow-site_blue_dark border border-blue bg-site_mint hover:bg-black px-6 rounded-3xl hover:tracking-widest transition-all py-2 "
        >
          <h6 className="text-lg text-white">what we do</h6>
        </button>
           :
           <button
           onClick={(e) => handleProject(e)}
           className="shadow-lg shadow-site_blue_dark border border-white bg-black 
           hover:border-blue hover:bg-site_mint px-6 rounded-3xl py-2 hover:tracking-widest transition-all"
         >
           <h6 className="text-lg text-white">hide</h6>
         </button>
            }
        
        <WeChooseUs open={open}/>
      </section>
      <div className={styles.hr_line} />
      <GetGenInfo/>

      <div className={styles.hr_line} />
      <UploadCV/>
    </Container>
    {/* </ThemeProvider> */}
    </GeneralProviderNoAccount>
  )
}

export default Contact;