"use client"
import React, {MouseEvent} from 'react';
import MainApi from './MainApi';
import { Grid, Container } from "@mui/material";
import Image from "next/image";

function openPage(link: string): void {
  window.open(link)
}

const WebToons = () => {
  const URL =process.env.NEXT_PUBLIC_aws;
  const webtoon1 = `${URL}/webtoon1.png`;
  const webtoon2 = `${URL}/webtoon2.png`;

  const handleLink = (e: MouseEvent<HTMLButtonElement> | undefined, link: string) => {
    e?.preventDefault();
    openPage(link);
  }
  return (
    <Container maxWidth="xl" className="my-2  dark:text-white dark:bg-black bg-white text-black">
      <div className="flex flex-col m-auto justify-center items-center lg:my-40 ">
        <Grid container spacing={{ xs: 3, sm: 2 }} className="my-2  ">
          <Grid item xs={12} md={3} className="relative flexCol font-bold  overflow-hidden">
            <Image src={webtoon1} alt="www.masterconnect.ca" height={450} width={450}
              className="absolute inset-0 aspect-video w-full "
            />
            <div className="m-auto flex flex-col items-center justify-center bg-[rgba(255,255,255,0.6)] p-1 z-20 text-black">

              <h3 className="text-xl text-center mx-auto my-2">WebToons</h3>
              <div className="mx-auto text-center ">
                <h5>WEBTOON is home to thousands of stories across 23 genres including romance, comedy, action, fantasy, and horror. Read comics, webcomics</h5>
                <h3> for more...</h3>
                <button onClick={(e) => handleLink(e, "https://www.webtoons.com")} className="button-one text-green font-bold text-2xl text-underline-offset-1" >link</button>
              </div>
            </div>

          </Grid>
          <Grid item xs={12} md={6} className="relative flex flex-col justify-center items-center">
            <MainApi />
          </Grid>
          <Grid item xs={12} md={3} className="relative flexCol relative  overflow-hidden">
            <Image src={webtoon2} alt="www.masterconnect.ca" height={450} width={450}
              className="absolute inset-0 aspect-video w-full"
              
            />
            <div className="m-auto flex flex-col items-center justify-center font-bold bg-[rgba(255,255,255,0.6)] z-20 text-black">
              <h3 className="text-xl text-center mx-auto my-2">WebToons</h3>
              <div className="mx-auto text-center">
                <h3>Webtoons-history</h3>
                <h5>are a type of digital comic that originated in South Korea usually meant to be read on smartphones.Find new stories or share your own with WEBTOON™, the largest webcomics community in the world on Youtube</h5>
                <button onClick={(e) => handleLink(e, "https://www.youtube.com")} className="button-one text-green font-bold text-2xl text-underline-offset-1" >link</button>
              </div>
            </div>

          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default WebToons