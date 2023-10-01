"use client";
const url = "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/1/8/1850-2023/data.json";
import React from 'react';
import dynamic from "next/dynamic";
import tempJson from "./temperature.json";
import type { xaxisType, seriesType, graphType_type, barType, plotOptionsType, lineStrokeType, legendType, } from "@component/extra/apexChart/types";
import { genStatistic } from "@climate/temperature/ultils";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type entryType<T> = {
  [K in keyof T]: [K: string, T[K]]
}
type temType = {
  description: {
    title: string,
    units: string,
    base_period: string,
  },
  data: {
    [key: string]: string
  }
}
type apexOptionShortType = {
  dataLabels: seriesType | null
}
type mainChartType = {
  refresh: boolean,
  graphType?: graphType_type,
  bar: barType | undefined,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  legend: legendType | undefined
}
function convertKeysToArray(data: entryType<object>) {
  let arr: { year: string, value: number }[] = [];
  for (const [key, amount] of Object.entries(data)) {
    arr.push({ year: key, value: parseFloat(amount) });
  }
  return arr
}

const TempChart = ({ refresh, setRefresh, graphType, bar, legend }: mainChartType) => {
  const getData = tempJson.data
  const XYValues = convertKeysToArray(getData);
  // console.log(XYValues)
  const [chartOptions, setChartOptions] = React.useState<object>({});
  const [xseries, setXseries] = React.useState<xaxisType>({ categories: [] });
  const [groupSeries, setGroupSeries] = React.useState<seriesType[]>([]);
  const [height, setHeight] = React.useState(800);
  const [stat, setStat] = React.useState<{ avg: number, slope: number, years: number, totIncrease: number } | undefined>();

  React.useEffect(() => {
    if (window.innerWidth < 920) {
      setHeight(800);
    }
    if (window.innerWidth < 520) {
      setHeight(600);
    }
  }, [height]);



  React.useMemo(() => {
    const getData = tempJson.data
    const XYValues = convertKeysToArray(getData);
    setXseries({
      categories: XYValues.map(data => (data.year))
    });
    setGroupSeries([{
      name: "Years",
      data: XYValues.map(data => (data.value))
    }]);
    setRefresh(false);
  }, [setXseries, setGroupSeries, setRefresh]);



  React.useEffect(() => {
    if (xseries && groupSeries && legend && graphType) {
      if (graphType === "bar") {

        const plotOption: plotOptionsType | null = { bar };
        const options = {
          chart: {
            type: graphType,
            id: "chart",
            offsetY: 16,
            offsetX: 0
          },
          // dataLabels:"",
          plotOptions: plotOption,
          colors: ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#A5978B", "#2b908f", "#f9a3a4", "#90ee7e", "#f48024", "#69d2e7"],
          series: groupSeries,
          legend: legend,
          xaxis: xseries
        }
        setChartOptions(options);
        setRefresh(false);
      } if (graphType === "line") {
        const options = {
          chart: {
            type: graphType,
            id: "chart"
          },
          series: groupSeries,
          xaxis: xseries
        }
        setChartOptions(options);
        setRefresh(false);
      }

    }


  }, [xseries, groupSeries, graphType, setRefresh, bar, setChartOptions, legend, refresh]);

  React.useMemo(() => {
    const getData = tempJson.data;
    let getStat = genStatistic(getData);
    setStat(getStat);
  }, []);



  return (
    <div className="w-full  shadow-lg shadow-blue rounded-lg"  >
      {
        stat &&
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-2 my-3 border border-blue shadow shadow-blue rounded-lg">
            <h3 className="text-lg m-auto">average:<span className="font-bold"> + {stat.avg} </span><sup> deg</sup> Cels per year, </h3>
            <h3 className="text-lg m-auto">gradiant:<span className="font-bold"> + {stat.slope}</span> <sup> deg</sup> Cels <sub className="font-bold">/</sub> per year</h3>

          </div>
          <h4 className="font-bold text-center mt-3">total: {stat.years} years</h4>
          <h4 className="font-bold text-center mt-3">total increase: {stat.totIncrease} <sup> deg</sup> Cels</h4>
        </div>
      }
      {
        groupSeries && xseries && chartOptions && ApexChart &&
        <ApexChart options={chartOptions} series={groupSeries} type={graphType} width={"100%"} height={height} />
      }
    </div>
  )
}

export default TempChart