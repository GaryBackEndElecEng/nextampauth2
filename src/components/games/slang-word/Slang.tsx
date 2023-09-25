"use client";
import React from 'react';
// import {ThemeProvider} from 'next-themes';
import FetchApi from './FetchApi';
import { Container } from "@mui/material";
import { ThemeContext } from '@/components/context/ThemeContext';

const Slang = () => {
    const { theme } = React.useContext(ThemeContext);
    return (
        // <ThemeProvider attribute="class">
        <div className={`${theme} lg:container lg:mx-auto lg:w-3/4  my-2 dark:bg-black dark:text-white bg-white text-black m-0`}>
            <div className="grid place-items-center">
                <h3 className="text-2xl text-center dark:bg-black dark:text-white">Slang Word Definition</h3>
                <FetchApi />

            </div>
        </div>
        // </ThemeProvider>
    )
}

export default Slang