"use client";
import React from 'react'
import CountryGraph from "./CountryGraph";
import EuroGraph from "./EuroGraph";
import AsiaGraph from "./AsiaGraph";
import NAGraph from "./NAGraph";
import SAGraph from "./SAGraph";
import AfricaGraph from "./AfricaGraph";
import { PopulationContext, PopulationContextProvider } from "@/components/context/GeneralContext";
import { GeneralContext } from "@component/context/GeneralContextProvider";

const IndexCountry = () => {
  const { setPage } = React.useContext(GeneralContext);
  const { loaded } = React.useContext(PopulationContext);

  React.useEffect(() => {
    setPage("/miscgraph")
  }, [setPage]);

  return (
    <PopulationContextProvider>
      <div className={`min-h-[20vh] w-full m-0 p-0`}>
        <CountryGraph />
        <EuroGraph />
        <AsiaGraph />
        <NAGraph />
        <SAGraph />
        <AfricaGraph />
      </div>
    </PopulationContextProvider>
  )
}

export default IndexCountry