"use client";
import React from 'react';
import LanguageCode,{languageType} from "@/components/countries/LanguageCode";


type countryType={
    countryCode: string,
    countryName: string,
    currencyCode: string,
    population: string,
    capital: string,
    continentName: string
}
type currencyCodeType={
    countryName:string,
    countryCode:string,
    currencyCode:string
}
const GenCurrCode = () => {

  return (
    <div className="flex flex-col items-start justify-start">
        <LanguageCode/>
    </div>
  )
}

export default GenCurrCode