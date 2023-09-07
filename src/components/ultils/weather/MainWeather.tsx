"use client";
import React, {MouseEvent} from 'react';
import { Container, Grid, Stack } from '@mui/material';
import GetWeather from './GetWeather';
import location from './Location';
// import GetCountry from './GetCountry';
import GetCity from './GetCity';
import Image from "next/image";


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
const MainWeather = () => {
    
    const [latLong, setLatLong] = React.useState<string | null>(null);
    const [selectedCo, setSelectedCo] = React.useState<string | null>(null);
    const [countryCode, setCountryCode] = React.useState<string | null>(null)
    const [send, setSend] = React.useState<sendType>({ loaded: false, coord: "" });
    const [countryHide, setCountryHide] = React.useState<boolean>(false)

    const handleGetWeather = (e: MouseEvent<HTMLButtonElement> | undefined) => {
        e?.preventDefault();
        console.log("clicked")
        // setLatLong('53.1,-0.13')
        setSend({ loaded: true, coord: latLong })
    }
    const handleReset = (e: MouseEvent<HTMLButtonElement> | undefined) => {
        e?.preventDefault();
        setLatLong(null);
        setSelectedCo(null);
        setCountryCode(null);
        setSend({ loaded: false, coord: "" })
        setCountryHide(false)
    }
    // console.log(latLong)
    return (
        <Container maxWidth="xl" className=" my-4 bg-[rgba(255,255,255,0.7)] text-black dark:bg-black dark:text-white  w-full mx-0 rounded-lg">

                    <div className="mt-6 bg-whitesmoke w-full ">
                        <GetCity
                            setLatLong={setLatLong}
                            setSelectedCo={setSelectedCo}
                            selectedCo={selectedCo}
                            setCountryCode={setCountryCode}
                            countryCode={countryCode}
                            setCountryHide={setCountryHide}
                            countryHide={countryHide}
                        />
                    </div>

                    <div className="flex flex-col mx-auto px-3 py-4">
                        <button
                            className="rounded-lg border border-teal-800 px-3 py-2 text-3lg text-blue"
                            onClick={(e) => handleReset(e)}
                        >
                            reset
                        </button>
                    </div>
                    {latLong !== null ?
                        <button
                            className="rotateColor rounded-lg shadow-xl shadow-grey-600 py-1 px-2 border-2 border-indigo-500 mb-4"
                            onClick={(e) => handleGetWeather(e)}
                        >
                            get weather
                        </button>
                        :
                        <div className="flex flex-col justify-center items-center">
                            <h3>not loaded</h3>
                        </div>
                    }
                    {send.loaded && <GetWeather latLong={send.coord} />}
                
                

            
        </Container>
    )
}

export default MainWeather