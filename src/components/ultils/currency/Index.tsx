"use client";
import React from 'react';
import MainCurrency from './MainCurrency';
import axios, { AxiosError } from 'axios';
import Dollar from "./Dollar";
import { Grid, Container } from "@mui/material";
import COCurrency from './COCurrency';
import {UltilsContextProvider} from "@context/GeneralContext"


const Index = () => {
    

    return (
        <UltilsContextProvider>
        <Container maxWidth="xl" sx={{marginBottom:"4rem"}}
        className="text-black bg-white dark:text-white dark:bg-black"
        >
            <Grid container  spacing={{ sm: 1, xs: 1, md: 4 }} sx={{ minHeight: "100vh",justifyContent:"center",alignItems:"center" }}>
                <Grid item xs={12} md={3} className="my-auto  shadow-lg shadow-blue text-white px-2 py-1 rounded-lg " sx={{ width: "100%", minHeight: "40vh", background: "black" }}>
                    <h2 className="text-2xl text-white my-2 text-center">world&#39;s currency<span className="pl-2 text-green">instructions:</span></h2>
                    <div className="grid grid-cols-2 place-items-center">

                        <h5 className="m-auto text-3lg">1.) select( click on) a base currency that you want to compare with from the shown selection.</h5>
                        <h5 className="m-auto text-3lg">2.) select a currency that you would like to compare with</h5>
                        <h5 className="m-auto text-3lg">3.) the box on the right shows the comparison between currencies. </h5>
                    </div>

                </Grid>
                <Grid item xs={12} md={6} className="m-auto shadow-lg shadow-teal-500 p-2">
                    <MainCurrency />
                </Grid>
                <Grid item xs={12} md={3} className="my-auto  shadow-lg shadow-blue text-white py-1 px-2 rounded-lg " sx={{ width: "100%", minHeight: "40vh", background: "black" }}>
                <h2 className="text-2xl text-green my-2 text-center">RESULTS</h2>
                    <div className="grid grid-cols-2 place-items-center">
                        
                        <h5 className="m-auto text-3lg">1.)Regulated date indicates the last updates on the rates. </h5>
                        <h5 className="m-auto text-3lg">2.) base: indicates the selected base currency</h5>
                        <h5 className="m-auto text-3lg">3.) The top base indicator: indicates the base $currency to the selected $ currency.</h5>
                        <h5 className="m-auto text-3lg">4.) the bottom base indicates the selected $ currency to the base $ currency</h5>
                    </div>
                </Grid>

            </Grid>
            <COCurrency />
        </Container>
        </UltilsContextProvider>
    )
}

export default Index