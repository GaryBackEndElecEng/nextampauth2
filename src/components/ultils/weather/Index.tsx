"use client";
import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import GetWeather from './GetWeather';
import location from './Location';
// import GetCountry from './GetCountry';
import GetCity from './GetCity';
import Image from "next/image";
import MainWeather from './MainWeather'
import { GeneralContext } from '../../context/GeneralContextProvider';


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
    const { setPage } = React.useContext(GeneralContext);
    const URL = process.env.NEXT_PUBLIC_aws;
    const summer = `${URL}/summer.png`;
    const winter = `${URL}/winter.png`;

    React.useEffect(() => {
        setPage("/weather")
    }, [setPage]);

    return (

        <div className="grid grid-cols-1 lg:grid-cols-8 w-full place-items-center gap-2 lg:gap-4 mx-0 bg-slate-200 text-black dark:bg-black dark:text-white bg-slate-300 mt-20 sm:mt-16 lg:mt-2">
            <div className="col-span-2 my-0 mt-0   shadow-big-2 rounded-xl lg:w-3/4 w-full flex flex-col items-start justify-center" style={{ backgroundImage: `url(${summer}) mt-16 sm:mt-12 lg:mt-1`, backgroundSize: "100% 100%", backgroundPosition: "50% 50%" }}>

                <div className="mx-0 flex flex-col items-start justify-center my-3 bg-[rgba(255,255,255,.7)] p-2 w-full dark:text-black">
                    <h3 className="text-xl m-auto text-center font-bold">Find Weather from around the world</h3>
                    <ul>
                        <li className="m-auto text-primary-700  font-[600] p-2">1.) find a country.</li>
                        <li className="m-auto  text-primary-700 font-[600] p-2">2.) find a city.</li>
                        <li className="m-auto  text-primary-700 font-[600] p-2">3.) submit.</li>
                        <li className="m-auto  text-primary-700 font-[600] p-2">4.) get detailed results!</li>
                    </ul>
                </div>
            </div>
            <div className="col-span-4 flex flex-col justify-center items-center  p-2 shadow-xl w-full shadow-black bg-whitesmoke lg:min-w-[500px]
            dark:shadow-blue">
                <MainWeather />
            </div>
            <div className="col-span-2 grid place-items-center mt-0 my-0  shadow-big-1 rounded-xl dark:text-black w-full lg:w-3/4" style={{ backgroundImage: `url(${winter})`, backgroundSize: "100% 100%", backgroundPosition: "50% 50%" }}>
                <div className="m-auto flex flex-col items-center bg-[rgba(255,255,255,.7)]  flex flex-col items-start justify-center ">
                    <h3 className=" mx-auto text-center text-xl py-2 my-2 text-3xl font-bold">Get detailed weather description not found elsewhere</h3>
                    <ul>
                        <li className="m-auto font-[600] text-primary-600 p-2">1.) Over 83 thousand cities to look up.</li>
                        <li className="m-auto font-[600] text-primary-600 p-2">2.) Detail weather description</li>
                        <li className="m-auto font-[600] text-primary-600 p-2">3.) Link to visual map</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Index