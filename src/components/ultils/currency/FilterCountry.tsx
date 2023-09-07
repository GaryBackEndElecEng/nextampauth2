"use client";
import React from 'react';
import {countryType} from "@context/Types";
import {Container} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

type mainFilterType={
    filterCo:countryType[] | undefined,
    show:boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}
const FilterCountry = ({filterCo,show,setShow}:mainFilterType) => {
    console.log("filterCo",filterCo)
  return (
    <div className="flex flex-col items-center justify-start absolute top-0 left-0 w-full  border rounded-lg p-3 bg-white dark:bg-black">
        <CancelIcon className="absolute top-0 right-0 text-black dark:text-white bg-blue dark:bg-black font-bold  cursor-pointer" onClick={()=>setShow(false)} sx={{fontSize:"40px",padding:"5px",m:0}}/>
    <div className="mx-auto container text-blue bg-white dark:text-white dark:bg-black rounded-lg shadow-lg shadow-blue dark:shadow-white  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 lg:gap-3  place-items-start border-2 overflow-y-scroll h-[26vh] lg:h-[30vh]"
    
    >
        {show && filterCo &&
        filterCo.map((country,index)=>(
            <div className="mx-auto col-span-1 flex flex-col justify-center items-start border border-blue dark:border-white shadow-lg shadow-blue dark:shadow-white rounded-md p-2" key={`${country.capital}-${index}`}>
            <h3 className="text-xl mx-auto font-bold"><span className="text-blue bg-white dark:text-green dark:bg-black">name: </span>{country.countryName}</h3>
            <h4 className="text-lg mx-auto font-bold"><span className="text-blue bg-white dark:text-green dark:bg-black">capital: </span> {country.capital}</h4>
            <div className="mx-auto flex flex-row flex-wrap">
                <h5 className="text-lg mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">continent:</span> {country.continentName}</h5>
                <h5 className="text-md mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">Co. code: </span> {country.countryCode}</h5>
                <h5 className="text-md mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">$ code: </span> {country.currencyCode}</h5>
            </div>
            <h5 className="text-lg mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black cursor-pointer">population:</span> {country.population}</h5>
        </div>
        ))
        }
        
    </div>
    <button className="button justify-self-end  mx-auto" onClick={()=>setShow(false)}>close</button>
    </div>
  )
}

export default FilterCountry