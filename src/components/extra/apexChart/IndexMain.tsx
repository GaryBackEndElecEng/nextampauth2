"use client";
import React from 'react';
import ApexMainPage from "./ApexMainPage";
import { GeneralApexChartProvider } from "@/components/context/GeneralContext";
import { GeneralContext } from '@/components/context/GeneralContextProvider';


const IndexMain = () => {
  const { setPage } = React.useContext(GeneralContext);
  React.useEffect(() => { setPage("/apexchart") }, [setPage]);
  return (
    <GeneralApexChartProvider>
      <ApexMainPage />
    </GeneralApexChartProvider>
  )
}

export default IndexMain