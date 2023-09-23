"use client";
import React from 'react'
import CountryGraph from "./CountryGraph";
import EuroGraph from "./EuroGraph";
import AsiaGraph from "./AsiaGraph";
import NAGraph from "./NAGraph";
import SAGraph from "./SAGraph";
import AfricaGraph from "./AfricaGraph";
import { PopulationContextProvider } from "@/components/context/GeneralContext";
import { GeneralContext } from "@component/context/GeneralContextProvider";

const IndexCountry = () => {
  const { setPage } = React.useContext(GeneralContext);

  React.useEffect(() => {
    setPage("/miscgraph")
  }, [setPage]);

  return (
    <PopulationContextProvider>
      <CountryGraph />
      <EuroGraph />
      <AsiaGraph />
      <NAGraph />
      <SAGraph />
      <AfricaGraph />
    </PopulationContextProvider>
  )
}

export default IndexCountry