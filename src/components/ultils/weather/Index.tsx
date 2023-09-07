"use client";
import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import GetWeather from './GetWeather';
import location from './Location';
// import GetCountry from './GetCountry';
import GetCity from './GetCity';
import Image from "next/image";
import MainWeather from './MainWeather'


type locationType = {
    country: string,
    name: string,
    lat: string,
    lng: string
}[]

type sendType = {
    loaded: boolean,
    coord: string | null
}
const Index = () => {
    const URL =process.env.NEXT_PUBLIC_aws;
    const summer = `${URL}/summer.png`;
    const winter = `${URL}/winter.png`;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 place-items-center gap-4 lg:gap-1 mx-0 bg-[rgba(255,255,255,0.7)] text-black dark:bg-black dark:text-white">
            <div className="col-span-1 my-0 mt-0 min-h-[50vh]  shadow-big-2 rounded-xl w-full flex flex-col items-start justify-center" style={{ backgroundImage: `url(${summer})`, backgroundSize: "100% 100%", backgroundPosition: "50% 50%" }}>

                <div className="mx-0 flex flex-col items-start justify-center my-3 text-xl bg-[rgba(255,255,255,.7)] p-2 w-full dark:text-black">
                    <h3 className="text-3xl m-auto text-center font-bold">Find Weather from around the world</h3>
                    <h6 className="m-auto bg-[rgba(255,255,255,.3)] font-[600] p-2">1.) find a country.</h6>
                    <h6 className="m-auto bg-[rgba(255,255,255,.3)] font-[600] p-2">2.) find a city.</h6>
                    <h6 className="m-auto bg-[rgba(255,255,255,.3)] font-[600] p-2">3.) submit.</h6>
                    <h6 className="m-auto bg-[rgba(255,255,255,.3)] font-[600] p-2">4.) get detailed results!</h6>
                </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center gap-3 p-2 shadow-xl w-full shadow-black bg-whitesmoke lg:min-w-[500px]
            dark:shadow-blue">
                <MainWeather />
            </div>
            <div className="col-span-1 grid place-items-center mt-0 my-0 min-h-[50vh] shadow-big-1 rounded-xl dark:text-black" style={{ backgroundImage: `url(${winter})`, backgroundSize: "100% 100%", backgroundPosition: "50% 50%" }}>
                <div className="m-auto flex flex-col items-center bg-[rgba(255,255,255,.7)] text-xl flex flex-col items-start justify-center ">
                    <h6 className=" mx-auto text-center py-2 my-2 text-3xl font-bold">Get detailed weather description not found elsewhere</h6>
                    <p className="m-auto font-[600] p-2">1.) Over 83 thousand cities to look up.</p>
                    <p className="m-auto font-[600] p-2">2.) Detail weather description</p>
                    <p className="m-auto font-[600] p-2">3.) Link to visual map</p>
                </div>
            </div>
        </div>
    )
}

export default Index