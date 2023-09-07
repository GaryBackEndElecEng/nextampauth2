"use client";
import React from 'react';
import ApexMainPage from "./ApexMainPage";
import {GeneralApexChartProvider} from "@/components/context/GeneralContext";

const IndexMain = () => {
  return (
    <GeneralApexChartProvider>
    <ApexMainPage/>
    </GeneralApexChartProvider>
  )
}

export default IndexMain