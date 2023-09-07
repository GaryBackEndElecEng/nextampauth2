"use client";
import React from 'react';
// import {ThemeProvider} from 'next-themes';
import FetchApi from './FetchApi';
import {Container} from "@mui/material";




export const sound_clip="this_is_a_very_long_64_bit_sound_string";
const Slang = () => {
    
    return (
        // <ThemeProvider attribute="class">
        <Container maxWidth="lg" className=" my-2 dark:bg-black dark:text-white bg-white text-black">
            <div className="grid place-items-center">
                <h3 className="text-2xl text-center">Slang Word Definition</h3>
                <FetchApi/>
                
            </div>
        </Container>
        // </ThemeProvider>
    )
}

export default Slang