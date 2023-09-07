"use client";
import React from 'react';
import {UltilsContext} from "@context/GeneralContext";


const GenCountries = () => {
    const {getCountries}=React.useContext(UltilsContext)
    

  return (
    <div className="m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center w-full gap-2 sm:gap-1 md:gap-3  overflow-y-scroll "
    style={{height:"50vh"}}>
        {getCountries ? getCountries.map((country,index)=>(
        <div className="m-auto col-span-1 flex flex-col justify-center items-start border border-blue dark:border-white shadow-lg shadow-blue dark:shadow-white rounded-md p-3" key={`${country.capital}-${index}`}>
            <h3 className="text-xl mx-auto font-bold"><span className="text-blue bg-white dark:text-green dark:bg-black break-keep">name: </span>{country.countryName.slice(0,20)}</h3>
            <h4 className="text-lg mx-auto font-bold"><span className="text-blue bg-white dark:text-green dark:bg-black">capital: </span> {country.capital}</h4>
            <div className="mx-auto flex flex-row flex-wrap gap-1">
                
                <h5 className="text-md mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">Co. code: </span> {country.countryCode}</h5>
                <h5 className="text-md mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">$ code: </span> {country.currencyCode}</h5>
            </div>
            <h5 className="text-md mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">continent:</span> {country.continentName}</h5>
            <h5 className="text-lg mx-auto"><span className="text-blue bg-white dark:text-green dark:bg-black">population:</span> {country.population}</h5>
        </div>
        ))
        :
        <div className="col-span-3 flex flex-col items-center">
            <h3 className="text-center text-xl">loading..</h3>
        </div>    
    }
    </div>
  )
}

export default GenCountries