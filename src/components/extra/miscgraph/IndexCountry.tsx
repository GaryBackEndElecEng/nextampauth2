"use client";
import React from 'react'
import CountryGraph from "./CountryGraph";
import EuroGraph from "./EuroGraph";
import AsiaGraph from "./AsiaGraph";
import NAGraph from "./NAGraph";
import SAGraph from "./SAGraph";
import AfricaGraph from "./AfricaGraph";
import {PopulationContextProvider} from "@/components/context/GeneralContext";

const IndexCountry = () => {
  return (
    <PopulationContextProvider>
        <CountryGraph/>
        <EuroGraph/>
        <AsiaGraph/>
        <NAGraph/>
        <SAGraph/>
        <AfricaGraph/>
    </PopulationContextProvider>
  )
}

export default IndexCountry