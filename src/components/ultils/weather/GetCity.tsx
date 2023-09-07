"use client";
import React from 'react';
import {searchCountry,searchCity} from './countryCode'
import {InputLabel,Input,FormControl} from "@mui/material";
import CountryButton from './CountryButton';
import CityButton from './CityButton';

type countryType={
    name:string,
    code:string
  }[]
type objectType={
    name:string,
    code:string
  }
  type locObjType={
    country: string,
    name: string,
    lat: string,
    lng: string
}
  type locationType={
    country: string,
    name: string,
    lat: string,
    lng: string
}[]
type setSelectLatLongType={
    setLatLong:React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedCo:React.Dispatch<React.SetStateAction<string | null>>,
    setCountryCode:React.Dispatch<React.SetStateAction<string | null>>,
    countryCode:string | null,
    selectedCo:string | null,
    setCountryHide:React.Dispatch<React.SetStateAction<boolean>>,
    countryHide:boolean
}
const GetCity = ({setLatLong,setSelectedCo,setCountryCode,selectedCo,countryCode,setCountryHide,countryHide}:setSelectLatLongType) => {
    const [countryList,setCountryList]=React.useState<countryType |null>(null)
    const [cityList,setCityList]=React.useState<locationType |null |undefined>(null)
    const [country,setCountry]=React.useState<string>("")
    const [city,setCity]=React.useState<string >("")
    const hideCountry=countryHide ? "none":"flex";
    
// console.log("hideCountry",hideCountry,"countryHide",countryHide)
    React.useMemo(async ()=>{
        setCountryList(
            searchCountry(country)
        )
        if(countryCode && city){
            let getCityList= await searchCity(city,countryCode)
            setCityList(
                getCityList
            )
        }
    },[country,countryCode,city]);
     
  return (
    <div className="flex flex-col gap-3 flex-wrap m-auto container mx-auto justify-start items-center bg-[rgba(255,255,255,0.7)] text-black dark:bg-black dark:text-white" >
        {!(countryCode && selectedCo) ? <div className="m-auto">
        <FormControl className="bg-white text-black dark:bg-white dark:text-black my-2 p-2 rounded-lg">
            <InputLabel htmlFor="searchCountry" shrink={true}>find Country</InputLabel>
            <Input
            id="searchCountry"
            name="searchCountry"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            />
        </FormControl>
        </div>
        :
        <div className="flex flex-col gap-3 flex-wrap m-auto container mx-auto justify-center items-start" >
            <p className="m-auto text-3xl">{selectedCo}</p>
        </div>
        }

        { countryCode && 

        <div className="m-auto">
        <FormControl className="bg-white text-black dark:bg-white dark:text-black my-2 p-2 rounded-lg">
            <InputLabel htmlFor="searchCity" shrink={true} className="bg-[rgba(255,255,255,0.7)] text-black ">find City</InputLabel>
            <Input
            id="searchCity"
            name="searchCity"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            />
        </FormControl>
        </div>

        }
        
            <div 
            className={!countryHide ? " hideshowCount flex flex-col gap-2  m-auto container mx-auto justify-center items-center px-2 py-4" : "none"} 
            style={{height:"30vh",overflowY:"scroll",display:hideCountry}}
            >
            {(!countryCode && countryList) && 
                countryList.map((obj,index:number)=>(
                    <div key={`${obj.code}-${index}`}>
                    <CountryButton 
                    obj={obj}
                    setCountryCode={setCountryCode}
                    setSelectedCo={setSelectedCo}
                    setCountryHide={setCountryHide}
                    />
                    </div>
                ))
                
            }
            </div>
       
        <div className="flex flex-col gap-2  justify-center items-center px-2 py-1 " style={{height:"30vh",overflowY:"scroll",width:"100%"}}>
            {(cityList && countryCode) && 
            cityList.map((obj,index:number)=>(
                <div key={`${obj.lat}-${index}`} className="w-full m-auto"> 
                <CityButton
                    obj={obj}
                    setLatLong={setLatLong}
                    countryCode={countryCode}
                    setCity={setCity}
                />
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default GetCity