"use client";
import React, { MouseEvent } from 'react';
// import { ThemeProvider } from 'next-themes';
import Image from "next/image";
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
        <div className={`${theme} topMasterHome dark:bg-slate-900 bg-slate-200 dark:text-white text-black  w-full sm:m-0`} style={{ padding: 0 }}>
            <GeneralProviderNoAccount>
                {/* <ThemeProvider attribute="class"> */}
                <HomeHeader />
                <ViewArticCont />
                <main className=" my-1 dark:bg-slate-900 dark:text-white text-black bg-[whitesmoke] prose-md">
                    <AllNavFeed />
                </main>

                {/* </ThemeProvider> */}
            </GeneralProviderNoAccount>
        </div>
    )
}

export default HomeBodyNew