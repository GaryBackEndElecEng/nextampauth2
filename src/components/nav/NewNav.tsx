"use client";
import Image from 'next/image';
import React, { MouseEvent } from 'react';
// import { GeneralContextNoAcc } from "@/components/context/GeneralContext";
import { useRouter } from "next/navigation";
import { CombineButtons } from "@component/ultilities";
import SignUp from "@component/emails/SignUp";
import styles from "@component/header/header.module.css";
import { GeneralContext } from '../context/GeneralContextProvider';
import ListIcon from '@mui/icons-material/List';
import { IconButton } from "@mui/material";
import { ThemeContext } from '../context/ThemeContext';
import NavButton from "@component/component/NavButton";



type navType = {
    id: number,
    name: string,
    link: string
}[]

export const navLinkGames: navType = [
    { id: 1, name: "games", link: "/games" },
    { id: 2, name: "webtoon", link: "/games/webtoon" },
    { id: 3, name: "rawio", link: "/games/rawio" },
    { id: 4, name: "slang-word", link: "/games/slang-word" },

]
export const navLinkUltils: navType = [
    { id: 1, name: "ultils", link: "/ultils" },
    { id: 2, name: "weather", link: "/ultils/weather" },
    { id: 3, name: "translate", link: "/ultils/translate" },
    { id: 4, name: "currency", link: "/ultils/currency" },
    { id: 5, name: "countries", link: "/ultils/countries" },
    { id: 6, name: "techtool", link: "/ultils/techtool" },


]
export const navLinkExtras: navType = [
    { id: 1, name: "extra", link: "/extra" },
    { id: 2, name: "charts", link: "/extra/chart" },
    { id: 3, name: "directgraph", link: "/extra/directgraph" },
    { id: 4, name: "richChart", link: "/extra/richChart" },
    { id: 5, name: "miscgraph", link: "/extra/countrygraph" },

]
export const navLinkHome: navType = [
    { id: 1, name: "home", link: "/" },
    { id: 2, name: "contact", link: "/contact" },
    { id: 3, name: "masterconnect", link: "https://www.masterconnect.ca" },
    { id: 4, name: "articles", link: "/articles" },



]


const NewNav = () => {
    const { theme } = React.useContext(ThemeContext);
    const router = useRouter();
    const { setSignup } = React.useContext(GeneralContext);
    const URL = process.env.NEXT_PUBLIC_aws;
    const logo: string = `${URL}/logo.png`;
    const design = "https://www.masterconnect.ca/designs";
    const home = navLinkHome?.find(obj => (obj.name === "home")) || undefined;
    const games = navLinkGames?.find(obj => (obj.name === "games")) || undefined;
    const ultils = navLinkUltils?.find(obj => (obj.name === "ultils")) || undefined;
    const extra = navLinkExtras?.find(obj => (obj.name === "extra")) || undefined;
    const articles = navLinkHome?.find(obj => (obj.name === "articles")) || undefined;
    const contact = navLinkHome?.find(obj => (obj.name === "contact")) || undefined;


    const handleLink = (e: MouseEvent, link: string | undefined) => {
        e.preventDefault();

        if (link && !link.startsWith("http")) {
            router.push(link);
        } else if (link && link.startsWith("http")) {
            window.open(link, "blank");
        }
    }

    return (


        <nav className={`${theme} mainNav bg-transparent dark:lg:bg-black lg:bg-blue-200 dark:text-white lg:w-full `}>


            <main className="subMainNav  lg:flex  lg:flex-row lg:justify-around lg:items-center lg:gap-10 relative !prose-invert " style={{ zIndex: 0 }}>
                <section className="logoContainer  m-auto relative rounded-full lg:basis-1/5 w-[5%]">
                    <IconButton sx={{ display: { xs: "none", md: "block" } }}>
                        <Image src={logo} alt="www.masterconnect.ca" height={45} width={45}
                            className="rounded-full shadow shadow-blue-800"
                        />
                    </IconButton>
                    <IconButton
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <ListIcon sx={{ color: "white", font: "bold", fontSize: { sm: "150%", md: "200%" } }} />
                    </IconButton>


                </section>
                <section className={"mainLinkgroup basis-4/5 lg:block w-full"}>
                    <div className="subNavLinkgroup flex flex-col  lg:flex-row justify-around gap-2 sm:gap-4 lg:gap-1 lg:w-full items-center lg:bg-blue dark:text-white text-black  ">

                        <NavButton
                            onClick={(e) => handleLink(e, home?.link)}>
                            home
                        </NavButton>
                        <NavButton
                            onClick={(e) => handleLink(e, design)}>
                            Designs
                        </NavButton>

                        <NavButton
                            onClick={(e) => handleLink(e, articles?.link)}>
                            articles
                        </NavButton>

                        <NavButton
                            onClick={(e) => handleLink(e, contact?.link)}>
                            contact
                        </NavButton>

                        <NavButton onClick={() => setSignup(true)}>signup</NavButton>




                    </div>



                </section>

                <section className="combineButtons" >
                    <CombineButtons />
                </section>
            </main>
            <section className="combineButtons_hidelarge ">
                <CombineButtons />
            </section>
        </nav>

    )
}

export default NewNav