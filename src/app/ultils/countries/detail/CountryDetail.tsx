"use client";
import React from 'react';
import CountryItem from "@/components/countries/CountryItem";
import {useSearchParams,ReadonlyURLSearchParams} from "next/navigation";

const CountryDetail = () => {
    const searchParams=useSearchParams();
    const name=searchParams ? searchParams.get("name") : null ;
  return (
    
    <div className="lg:mx-auto lg:container ">
        <CountryItem name={name} />
        
    </div>
    
  )
}

export default CountryDetail