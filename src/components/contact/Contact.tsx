"use client";
import React, { MouseEvent } from 'react';
// import {ThemeProvider} from 'next-themes';
import { GeneralProviderNoAccount } from "@context/GeneralContext";
import Link from "next";
import styles from './contact.module.css';
import { Grid, Container, Typography, Stack, Fab } from '@mui/material';
import RequestForm from './RequestForm';
import GetGenInfo from './GetGenInfo';
import UploadCV from './UploadCV';
import Image from 'next/image';
import WeChooseUs from './WeChooseUs';
import { GeneralContext } from '../context/GeneralContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import Button from "@component/component/Button";


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
type mediaLinkType = {
  name: string,
  link: string
}

const Contact = () => {
  const { theme } = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const staticImage = process.env.NEXT_PUBLIC_aws;
  const webService = `${staticImage}/webService.png`;
  const { setPage } = React.useContext(GeneralContext);

  React.useEffect(() => {
    setPage("/contact")
  }, [setPage]);

  const bgImage: object = {
    backgroundImage: `url(${webService})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "50% 50%"
  }
  React.useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);


  const handleProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

  }

  return (
    <GeneralProviderNoAccount>
      {/* <ThemeProvider attribute="class"> */}
      <Container maxWidth="xl" className={`${theme} mx-0 dark:bg-black dark:text-white bg-white text-black mt-1 lg:mx-auto lg:container  `} >



        <Grid container spacing={{ md: 3, sm: 0 }}
          sx={{ marginTop: { sm: "4.5rem", xs: "5rem", md: "0rem" } }}
        >
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

            <Button
              onClick={(e) => handleProject(e)}

            >
              <h6 className="text-lg text-white">what we do</h6>
            </Button>
            :
            <Button
              onClick={(e) => handleProject(e)}
            >
              <h6 className="text-lg text-white">hide</h6>
            </Button>
          }

          <WeChooseUs open={open} />
        </section>
        <div className={styles.hr_line} />
        <GetGenInfo />

        <div className={styles.hr_line} />
        <UploadCV />
      </Container>
      {/* </ThemeProvider> */}
    </GeneralProviderNoAccount>
  )
}

export default Contact;