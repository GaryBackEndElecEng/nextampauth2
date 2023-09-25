"use client";
import React, { MouseEvent } from 'react';
// import { ThemeProvider } from 'next-themes';
import Image from "next/image";
// import "./home.css"
import HomeAnchor from "./HomeAnchor";
import ViewArticCont from './ViewArticCont';
import { GeneralProviderNoAccount } from "@context/GeneralContext";
import { GeneralContext } from "@context/GeneralContextProvider";
import AllNavFeed from './AllNavFeed';
import HomeHeader from './HomeHeader';
import type { userInfoType, PostDataType } from "@context/type";
import { ThemeContext } from "@context/ThemeContext";


type mainHomeType = {
    getusersInfo: userInfoType[] | null
}

const HomeBodyNew = () => {
    const { setAllPosts, setPage, pageInfo } = React.useContext(GeneralContext);
    const { theme } = React.useContext(ThemeContext);

    React.useEffect(() => {
        setPage("/home")
    }, [setPage]);

    React.useEffect(() => {
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, []);


    return (
        <div className={theme}>
            <GeneralProviderNoAccount>
                {/* <ThemeProvider attribute="class"> */}
                <HomeHeader />
                <ViewArticCont />
                <main className="lg:container lg:mx-auto my-1 dark:bg-black dark:text-white text-black bg-[rgba(255,255,255,0.6)]">
                    <AllNavFeed />
                </main>

                {/* </ThemeProvider> */}
            </GeneralProviderNoAccount>
        </div>
    )
}

export default HomeBodyNew