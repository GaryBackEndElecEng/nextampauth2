"use client";
import React from 'react';
import styles from "./header.module.css";
// import {ThemeProvider} from 'next-themes';
import ColorBtn from './ColorBtn';
import SignUp from "@component/emails/SignUp";
import { GeneralContext } from '../context/GeneralContextProvider';



const Header = () => {
  const URL = process.env.NEXT_PUBLIC_aws;
  const [close, setClose] = React.useState<boolean>(false);
  const [hide, setHide] = React.useState<boolean>(false);
  const [expand, setExpand] = React.useState<boolean>(false);
  const { signup } = React.useContext(GeneralContext);
  // const headerImage:string=`${URL}/header.png`;
  const headerImage: string = `${URL}/bg_navada.png`;

  return (
    // <ThemeProvider attribute="class">
    <main
      className={styles.masterHeader}
      style={{ backgroundImage: `url(${headerImage})`, zIndex: "0", position: "relative" }}
    >
      <div className="relative z-5000 right-2 top-[20%]  sm:top-[20] lg:right-10 lg:-top-10 shadow shadow-blue rounded-lg z-500000">
        <ColorBtn />
      </div>
      {signup &&


        <div className={!close ? `${(hide) ? styles.hide : styles.signUp} text-center absolute`
          :
          "hidden"
        }
        >
          <SignUp
            setClose={setClose}
            setHide={setHide}
            setExpand={setExpand}
            expand={expand}
          />

        </div>

      }
      <div className="grid  place-items-center absolute top-[84%] left-[10%] md:top-[50%] lg:top-13  md:left-[15%] lg:left-[10%] z-[0] w-3/4">
        <div>
          <h4 className={`text-center text-white m-auto sm:text-md md:text-3xl  `}>Thank you for visiting Us!</h4>
          <h3 className="animate-pulse text-sm sm:text-xl text-white mt-1 lg:mt-10 p-2 bg-[rgba(0,0,0,0.6)]">masterconnect.ca @ masterultils.ca</h3>
        </div>

      </div>

    </main>
    // </ThemeProvider>
  )
}

export default Header