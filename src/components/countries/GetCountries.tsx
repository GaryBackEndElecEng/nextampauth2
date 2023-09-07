"use client";
import React from "react";
import {getCountriesType} from "@/components/countries/types";
export type languageType={
    code:string,
    name:string
}
const getCountries = async():Promise<getCountriesType[]> => {
            const url="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/countryJSON.json"
            const res= await fetch(url);
            const body: getCountriesType[]=await res.json();
            return body
}

export default getCountries