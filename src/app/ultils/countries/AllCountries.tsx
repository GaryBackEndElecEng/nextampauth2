" use client";
import React from 'react'
import MasterCountry from '@/components/countries/MasterCountry';
import {CountryContextProvider} from "@/components/context/GeneralContext";

const AllCountries = () => {
    
  return (
    <CountryContextProvider>
    <MasterCountry/>
    </CountryContextProvider>
  )
}

export default AllCountries