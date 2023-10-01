"use client";
import React from 'react';
import styles from "./miscgraph.module.css";
import { optionsType, seriesType, xaxisType, chartType, plotOptionsType, titleType } from '@/components/extra/miscgraph/types';
import { africaPrep, topTenAfrica } from "./ultils";
import dynamic from "next/dynamic";
//The below is needed to prevent the code from rendering before window.dom has been installed or noticed
const CountryChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { PopulationContext } from "@/components/context/GeneralContext";
import countries from "./countryJSON.json";




const AfricaGraph = () => {
  const [chartOptions, setChartOptions] = React.useState<object>({});
  const [groupseries, setGroupSeries] = React.useState<seriesType>([]);
  const { setAfrLoaded, loaded } = React.useContext(PopulationContext);

  React.useEffect(() => {
    if (groupseries && chartOptions) {
      setAfrLoaded(true)
    } else {
      setAfrLoaded(false)
    }
  }, [chartOptions, groupseries, setAfrLoaded]);


  React.useMemo(() => {
    const plotOptions: plotOptionsType = {
      bar: {
        horizontal: false,
        distributed: false,
        barHeight: "100%"
      }
    }
    const title: titleType = {
      text: "Africa",
      style: {
        color: "orange",
        fontSize: "30px",

      }
    }
    const options = {
      chart: {
        id: 'masterconnect'
      },
      xaxis: africaPrep(countries).xaxis,
      plotOptions: plotOptions,
      title: title
    }
    const series_ = africaPrep(countries).yseries
    setGroupSeries(series_);
    setChartOptions(options);


  }, []);



  return (
    <div className="w-full lg:mx-auto lg:container bg-slate-400 text-black shadow-lg shadow-blue rounded-lg relative"  >
      {loaded ?
        <>
          <CountryChart options={chartOptions} series={groupseries} type={"bar"} width={"100%"} height={600} />
          <div className="absolute  right-0 top-0 shadow-lg shadow-blue rounded-lg bg-black text-white z-1000 border border-[white] flex flex-col gap-2">
            <small className="text-md text-center w-full">TOP 5</small>
            {topTenAfrica(countries).length > 0 && loaded &&
              topTenAfrica(countries).map((co, index) => (
                <div className="m-auto flex flex-row items-center justify-start gap-1 p-1 border-b border-[white]" key={co.id}>
                  <small className="m-auto text-xs text-blue">{co.id}</small>
                  <small className="m-auto text-xs">{co.name}</small>
                  <small className="m-auto text-xs">{co.pop}</small>
                </div>
              ))
            }
          </div>
        </>
        :
        <h3 className="text-center text-4xl font-bold p-10">loading Africa</h3>
      }
    </div>
  )
}

export default AfricaGraph