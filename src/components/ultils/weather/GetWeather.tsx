"use client"
import React from 'react';
import axios, { AxiosError,isAxiosError } from 'axios';
import Image from 'next/image';
import {Container,Grid,Stack,Card,CardContent} from '@mui/material';
import WindPowerIcon from '@mui/icons-material/WindPower';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompressIcon from '@mui/icons-material/Compress';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import CheckIcon from '@mui/icons-material/Check';

type resultType={
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
      },
      current: {
        last_updated_epoch:number,
        last_updated: string,
        temp_c: number,
        temp_f: number,
        is_day: number,
        condition: {
          text: string,
          icon: string,
          code: number
        },
        wind_mph:number,
        wind_kph: number,
        wind_degree: number,
        wind_dir: string,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        precip_in: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        feelslike_f: number,
        vis_km: number,
        vis_miles: number,
        uv: number,
        gust_mph: number,
        gust_kph: number
      }
}
const GetWeather =  ({latLong}:{latLong:string | null}) => {
    const staticImage: string | undefined=process.env.NEXT_PUBLIC_aws
    const gust=`${staticImage}/gust.png`;
    const humid=`${staticImage}/humid.png`;
    const uvindex=`${staticImage}/uvindex.png`;
    const feels=`${staticImage}/feels.png`;
    const weather=`${staticImage}/weather.png`;
    const gustImage=staticImage ? <Image src={gust} width={45} height={45} alt="www.masterconnect.ca"/>:<></>;
    const humidImage=staticImage ? <Image src={humid} width={25} height={25} alt="www.masterconnect.ca"/>:<></>;
    const uvIndex=staticImage ? <Image src={uvindex} width={35} height={35} alt="www.masterconnect.ca"/>:<></>;
    const feelsImg=staticImage ? <Image src={feels} width={30} height={30} alt="www.masterconnect.ca" className="bg-blue rounded-[50%] p-1 ml-2"/>:<></>;
    const Weather=staticImage ? <Image src={weather} width={125} height={125} alt="www.masterconnect.ca"className="text-blue self-align-center"/>:<></>;
    const [results,setResults]=React.useState<resultType | null>(null);
    const [error,setError]=React.useState<string | null>(null);
    const apiKey:string | undefined=process.env.NEXT_PUBLIC_rapidAip

    React.useEffect(()=>{
        async function getWeather(){
        const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: latLong},
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
        };

        try {
            const res = await axios.request(options);
            const body=res.data;
            setResults(body)
        } catch (error) {
            setError(" either the city within the selected country was not found and or there is network error")
            if(axios.isAxiosError(error)){
                console.log(error.status)
                console.error(error.response)
            }else{
                console.error(error)
            }
        }
    }
    if(latLong && latLong.split(",") && apiKey){
        getWeather();
    }
    },[latLong,apiKey]);
    
  return (
    <Container maxWidth="lg">
        <div className="m-auto flex flex-col justify-center items-center bg-[rgba(255,255,255,0.7)] text-black dark:bg-black dark:text-white">
        {results && !error ?
        <div className="lg:container lg:mx-auto flex flex-col items-center justify-center">
        <Grid container spacing={3} className="lg:container lg:mx-auto">
             
            <Grid item xs={12} sm={4} md={4} className="rotateColor" >
                <Card elevation={3} className="location flex flex-col justify-start items-start m-auto shadow-lg shadow-blue-300 rounded-lg p-2">
                    {Weather}
                    <h6 className="text-2lg "><span className="text-teal-500">name: </span>{results.location.name}</h6>  
                    <h6 className="text-2lg "><span className="text-teal-500">region: </span>{results.location.region}</h6>  
                    <h6 className="text-2lg "><span className="text-teal-500">Co: </span>{results.location.country}</h6>  
                    <h6 className="text-2lg "><span className="text-teal-500">latitude: </span>{results.location.lat} <sup>o</sup>deg</h6>  
                    <h6 className="text-2lg "><span className="text-teal-500">longitude: </span>{results.location.lon} <sup>o</sup>deg</h6>  
                </Card>
               
            </Grid>
            <Grid item xs={12} sm={8} md={8} className="current flex flex-col justify-center items-center">
                <Grid container spacing={{md:1,xs:3}} className="lg:container lg:mx-auto">
                    <Grid item xs={12} sm={6}>
                    <div className="container m-auto">condition:
                    <Card elevation={3} className="relative py-2 px-1 flex flex-auto m-auto rounded-lg shadow-lg shadow-teal-700">
                        <Image src={`https:${results.current.condition.icon}`} width={75} height={75} alt="www.masterconnect.ca"/>
                        <CardContent className="flex flex-col items-center justify-start">
                            <div className="flex flex-row items-center justify-center">
                                <ThermostatIcon sx={{ml:1,mr:1,color:"blue"}} />
                                <h6 className=" m-auto text-red-600">{results.current.temp_c} <sup>o </sup>c , </h6>
                                <h6 className=" m-auto text-red-600">{results.current.temp_f} <sup>o </sup>f</h6>
                            </div>
                            <div className="flex flex-row items-center justify-center">
                            <h6 className="text-2lg m-auto">cloud <FilterDramaIcon sx={{ml:1,mr:1,color:"blue"}}/>:{results.current.condition.text}</h6>
                            <h6 className="text-2lg m-auto">, {results.current.cloud} %</h6>
                            </div>
                            <h6 className="text-2lg m-auto">last Update <CheckIcon sx={{ml:1,mr:1,color:"blue"}}/>:{results.current.last_updated}</h6>
                    </CardContent>
                    </Card>
                    </div>
                    
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <h6 className="text-2lg m-auto flex flex-row flex-nowrap items-center ">
                       <span className="text-blue"> feels like :{results.current.feelslike_c} <sup>o </sup>c</span> 
                        <span className="text-2lg text-site_mint">, {results.current.feelslike_f} <sup>o </sup>f</span> {feelsImg}
                    </h6>
                    <h6 className="text-2lg m-auto flex inline-flex my-2">
                        gust {gustImage}:{results.current.gust_kph} <sup>kph</sup>,
                        <span className="text-2lg m-auto">{results.current.gust_mph} <sup>mph</sup></span>
                    </h6>
                    <h6 className="text-2lg m-auto my-1 flex flex-row items-center"> humidity {humidImage}:{results.current.humidity}</h6>
                    <h6 className="text-2lg m-auto flex inline-flex my-2">
                        precip <WaterDropIcon sx={{ml:1,mr:1,color:"blue"}}/>:{results.current.precip_in}<sup>in</sup>
                        <span className="text-2lg m-auto">, {results.current.precip_mm}<sup>mm</sup></span>
                    </h6>
                    <h6 className="text-2lg m-auto flex inline-flex my-2">
                        pressure<CompressIcon sx={{ml:1,mr:1,color:"blue"}}/>:{results.current.pressure_in} <sup>pdin</sup>
                        <span className="text-2lg m-auto">,{results.current.pressure_mb} <sup>mb</sup></span>
                    </h6>
                    <h6 className="text-2lg m-auto flex flex-row items-center">uv{uvIndex}:{results.current.uv}</h6>
                    <h6 className="text-2lg m-auto">
                        wind <WindPowerIcon sx={{ml:1,mr:1, color:"blue"}}/>: {results.current.wind_kph} <sup>kph</sup>
                    <span className="text-2lg m-auto">{results.current.wind_mph} <sup>mph</sup></span>
                    </h6>
                    <small className="text-2lg m-auto mt-4">last udated<CheckIcon sx={{ml:1,mr:1, color:"blue"}}/>:{results.current.last_updated}</small>
                    
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
        </div>
        :
        (!error ?
        <div><h3>loading... or could not find</h3></div>
        :
        <div className="flex flex-col my-3 p-2 mx-auto">
            <p className="text-xl text-center p-1">{error}</p>
        </div>
        )
        }
        </div>
    </Container>
  )
}

export default GetWeather