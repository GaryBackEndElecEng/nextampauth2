"use client";
import React from 'react';
import styles from "./miscgraph.module.css";
import { optionsType, seriesType, xaxisType, chartType, plotOptionsType, titleType } from '@/components/extra/miscgraph/types';
import { euroPrep, topTenEuro } from "./ultils";
import dynamic from "next/dynamic";
//The below is needed to prevent the code from rendering before window.dom has been installed or noticed
const CountryChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { PopulationContext } from "@/components/context/GeneralContext";
import countries from "./countryJSON.json";




const EuroGraph = () => {
  const [chartOptions, setChartOptions] = React.useState<object>({});
  const [groupseries, setGroupSeries] = React.useState<seriesType>([]);
  const { setEurLoaded, loaded } = React.useContext(PopulationContext);

  React.useEffect(() => {
    if (groupseries && chartOptions) {
      setEurLoaded(true)
    } else {
      setEurLoaded(false)
    }
  }, [chartOptions, groupseries, setEurLoaded]);


  React.useMemo(() => {
    const plotOptions: plotOptionsType = {
      bar: {
        horizontal: false,
        distributed: false,
        barHeight: "100%"
      }
    }
    const title: titleType = {
      text: "Europe",
      style: {
        color: "blue",
        fontSize: "30px",

      }
    }
    const options = {
      chart: {
        id: 'masterconnect'
      },
      xaxis: euroPrep(countries).xaxis,
      plotOptions: plotOptions,
      title: title
    }
    const series_ = euroPrep(countries).yseries
    setGroupSeries(series_);
    setChartOptions(options);


  }, []);



  return (
    <div className="w-full lg:mx-auto lg:container bg-slate-300 text-black shadow-lg shadow-blue rounded-lg relative"  >
      {loaded ?
        <React.Fragment>
          <CountryChart options={chartOptions} series={groupseries} type={"bar"} width={"100%"} height={600} />
          <div className="absolute  right-0 top-0 shadow-lg shadow-blue rounded-lg bg-black text-white z-1000 border border-[white] flex flex-col gap-1 ">
            <small className="text-md text-center w-full">TOP 5</small>
            {topTenEuro(countries).length > 0 && loaded &&
              topTenEuro(countries).map((co, index) => (
                <div className="m-auto flex flex-row items-center justify-start gap-1 p-1 border-b border-[white]" key={co.id}>
                  <small className="m-auto text-xs text-blue">{co.id}</small>
                  <small className="m-auto text-xs">{co.name}</small>
                  <small className="m-auto text-xs">{co.pop}</small>
                </div>
              ))
            }
          </div>
        </React.Fragment>
        :
        <h3 className="text-center text-4xl font-bold p-10">loading Europe</h3>
      }
    </div>
  )
}

export default EuroGraph