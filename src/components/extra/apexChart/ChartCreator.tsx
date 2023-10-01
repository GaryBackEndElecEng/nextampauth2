"use client";

import React from 'react';
import { xaxisType, seriesType, graphType_type, barType, plotOptionsType, lineStrokeType, legendType } from './types';
import dynamic from "next/dynamic";
//The below is needed to prevent the code from rendering before window.dom has been installed or noticed
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })


type mainChartType = {
  xaxis: xaxisType | null,
  groupSeries: seriesType[] | [],
  refresh: boolean,
  graphType?: graphType_type,
  Bar: barType | undefined,
  stroke: lineStrokeType | undefined,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  legend: legendType | undefined
}

const ChartLine = ({ groupSeries, xaxis, refresh, setRefresh, graphType, Bar, stroke, legend }: mainChartType) => {
  const [chartOptions, setChartOptions] = React.useState<object>({});
  const [height, setHeight] = React.useState(1000);

  React.useEffect(() => {
    if (window.innerWidth < 920) {
      setHeight(800);
    }
  }, [height]);


  React.useEffect(() => {


    if (xaxis && groupSeries) {
      if (graphType === "bar") {
        // console.log(legend);
        const plotOption: plotOptionsType | null = { bar: Bar };
        const options = {
          chart: {
            // dropShadow:"",
            // toolbar:"",
            type: graphType,
            id: "chart"
          },
          // colors:"",
          // dataLabels:"",
          plotOptions: plotOption,
          series: groupSeries,
          legend: legend,
          xaxis: xaxis
        }
        setChartOptions(options);
        setRefresh(false);
      } if (graphType === "line") {
        // console.log(legend);
        const options = {
          chart: {
            type: graphType,
            id: "chart"
          },
          series: groupSeries,
          legend: legend,
          // stroke:stroke,
          xaxis: xaxis
        }
        setChartOptions(options);
        setRefresh(false);
      }

    }


  }, [xaxis, groupSeries, graphType, setRefresh, Bar, setChartOptions, stroke, legend, refresh]);



  return (
    <div className="w-full bg-[whitesmoke] shadow-lg shadow-blue rounded-lg"  >
      <ApexChart options={chartOptions} series={groupSeries} type={graphType} width={"100%"} height={height} />
    </div>
  )
}

export default ChartLine