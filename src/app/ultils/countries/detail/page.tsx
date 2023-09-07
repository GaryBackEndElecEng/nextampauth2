
// import React from 'react';
import {CountryContextProvider} from "@/components/context/GeneralContext";
import CountryDetail from "./CountryDetail";
import {metacountry} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metacountry;

const Page = () => {
   
   
  return (
    <CountryContextProvider>
    <div className="lg:mx-auto lg:container ">
        <CountryDetail />
        
    </div>
    </CountryContextProvider>
   
  )
}

export default Page