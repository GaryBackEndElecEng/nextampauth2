"use client";
import React from 'react';
import styles from "./miscgraph.module.css";
import { optionsType, seriesType, xaxisType, chartType, plotOptionsType, titleType } from '@/components/extra/miscgraph/types';
import { asiaPrep, topTenAsia } from "./ultils";
import dynamic from "next/dynamic";
//The below is needed to prevent the code from rendering before window.dom has been installed or noticed
const CountryChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { PopulationContext } from "@/components/context/GeneralContext";
import countries from "./countryJSON.json";




const AsiaGraph = () => {
  const [chartOptions, setChartOptions] = React.useState<object>({});
  const [groupseries, setGroupSeries] = React.useState<seriesType>([]);
  const { setAsiaLoaded, loaded } = React.useContext(PopulationContext);

  React.useEffect(() => {
    if (groupseries && chartOptions) {
      setAsiaLoaded(true)
    } else {
      setAsiaLoaded(false)
    }
  }, [chartOptions, groupseries, setAsiaLoaded]);

  React.useEffect(() => {
    const plotOptions: plotOptionsType = {
      bar: {
        horizontal: false,
        distributed: false,
        barHeight: "100%"
      }
    }
    const title: titleType = {
      text: "Asia",
      style: {
        color: "red",
        fontSize: "30px",

      }
    }
    const options = {
      chart: {
        id: 'masterconnect'
      },
      xaxis: asiaPrep(countries).xaxis,
      plotOptions: plotOptions,
      title: title
    }
    const series_ = asiaPrep(countries).yseries
    setGroupSeries(series_);
    setChartOptions(options);


  }, []);



  return (
    <div className="w-full lg:mx-auto lg:container bg-slate-400 shadow-lg shadow-blue rounded-lg relative"  >
      {loaded ?
        <>
          <CountryChart options={chartOptions} series={groupseries} type={"bar"} width={"100%"} height={600} />
          <div className="absolute  right-0 top-0 shadow-lg shadow-blue rounded-lg bg-black text-white z-1000 border border-[white] flex flex-col gap-2">
            {topTenAsia(countries).length > 0 && loaded &&
              topTenAsia(countries).map((co, index) => (
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
        <h3 className="text-center text-4xl font-bold p-10">loading Asia</h3>
      }
    </div>
  )
}

export default AsiaGraph