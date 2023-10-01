"use client";
import React from 'react';
import styles from "./header.module.css";
import { ThemeContext } from "@component/context/ThemeContext";
import ColorBtn from './ColorBtn';
import SignUp from "@component/emails/SignUp";
import ThankYou from "./ThankYou";
import { GeneralContext } from '../context/GeneralContextProvider';



const Header_ = () => {
  const { setTheme } = React.useContext(ThemeContext);
  const [welcome, setWelcome] = React.useState(false);
  const [welcome1, setWelcome1] = React.useState(false);
  const URL = process.env.NEXT_PUBLIC_aws;
  const [urlImage, setUrlImage] = React.useState<string | undefined>("")
  const headerImage: string = `${URL}/bg_navada.png`;

  React.useEffect(() => {

    if (!welcome) {
      setTimeout(() => {
        setWelcome(true);
      }, 3000);
    }
    if (welcome) {
      setTimeout(() => {
        setWelcome1(true);
      }, 3000);
    }

  }, [welcome, welcome1, urlImage, setUrlImage, headerImage]);


  return (
    // <ThemeProvider attribute="class">
    <main
      className={` ${styles.masterHeader} prose-md`}
      style={{ backgroundImage: `url(${headerImage})`, zIndex: "0", position: "relative" }}
    >
      <div className={`${styles.colorBtn} shadow shadow-blue rounded-lg `}>
        <ColorBtn />
      </div>

      <div className={`grid  place-items-center absolute top-[84%] left-[10%] md:top-[70%] lg:top-1  md:left-[30%] lg:left-[35%] z-[0] ${welcome && !welcome1 ? styles.welcomeShow : styles.welcomeHide}  `}>

        <ThankYou />

      </div>

    </main>
    // </ThemeProvider>
  )
}

export default Header_