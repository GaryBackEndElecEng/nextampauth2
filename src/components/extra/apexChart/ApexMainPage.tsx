"use client";

import React, { MouseEvent } from 'react';
import { seriesType, barType, xaxisType, lineStrokeType, graphType_type, legendType } from './types';
import {GeneralApexChart} from "@/components/context/GeneralContext";
import SeriesInput from "./SeriesInput";
import XaxisInput from "./XaxisInput";
import ChartCreator from "./ChartCreator";
import SelectGraphType from "./SelectGraphType";
import { Fab } from "@mui/material";

type plotOptions = {
  bar: {
    dataLabels: {
      position: string
    }
  }
}


const ApexMainPage = () => {
  const {groupSeries, setGroupSeries,serie, setSerie,xaxis, setXAxis,xaxisInput, setXaxisInput,legend, setLegend,Bar, setBar,lineStroke, setLineStroke,msgX, setMsgX,msg_S, setMsg_S,nameS, setNameS,addSeriesCount, setAddSeriesCount,refresh, setRefresh,show, setShow,graphType, setGraphType}=React.useContext(GeneralApexChart);
  
  const typeArr = ["line", "bar"]

  var count = 1;
  const addSeries = (series: seriesType): void => {
    count++;
    setGroupSeries([...groupSeries, series]);
    setAddSeriesCount([...addSeriesCount, count]);
    // console.log("series",series,groupSeries,count)
  };

  // console.log("graphType",groupSeries)
  const handleAll = (e: MouseEvent) => {
    e.preventDefault();
    if (serie && nameS) {
      setShow(true);
      let inputs: string[] = serie.split(",");
      let arr: number[] = [];
      if (inputs.length > 0 && typeof (parseInt(inputs[0])) === "number" && nameS) {
        inputs.forEach((str, index) => {
          arr.push(parseInt(str))
        });
        addSeries({ data: arr, name: nameS });
        // console.log({ data: arr, name: nameS })
        setNameS(null);
        setSerie(null);
        setMsg_S(null);
      } else {
        setShow(false);
        setRefresh(false);
        setMsg_S("please enter number,number,number format")
      }
    }
    if (xaxisInput) {

      let inputs: string[] = xaxisInput.split(",");
      let arr: string[] = [];
      if (inputs.length > 0 && typeof (inputs[0]) === "string") {
        inputs.forEach((str, index) => {
          arr.push(str)
        });
        setMsgX(null);
        setXAxis({ categories: arr });
        setRefresh(true);
      } else {
        setMsgX("please enter name1,name2,name3,,, format")
      }

    }
  }



  return (
    <div className="flex flex-col items-center justify-start my-1 mx-0 lg:mx-auto lg:container gap-2 w-full bg-black text-white " >
      <div className="grid grid-cols-1 lg:grid-cols-4 place-items-center mx-0 lg:mx-auto lg:gap-2 gap-y-1 border-2 w-full ">
        <div className="col-span-3 m-auto shadow-lg shadow-blue w-full">
          {!show ?
            <h3 className="text-center text-white dark:text-white text-2xl dar:text-white">pending display</h3>
            :
            <h3 className="text-center text-blue dark:text-blue text-2xl">Displayed</h3>
          }
          {groupSeries.length > 0 && graphType &&
            <ChartCreator
              groupSeries={groupSeries}
              xaxis={xaxis}
              refresh={refresh}
              setRefresh={setRefresh}
              graphType={graphType}
              Bar={Bar}
              stroke={lineStroke}
              legend={legend}
            />}
        </div>
        <div className="col-span-1 m-auto shadow-lg shadow-blue w-full">
          <XaxisInput/>

          <SeriesInput/>

          <div className="lg:mx-auto lg:container text-lg text-center w-full  " >
            <SelectGraphType
              typeArr={typeArr}
            />
          </div>
          <div className="flex flex-col items-center my-3 ">
            {(groupSeries.length > 0 || serie) &&
              <Fab variant="extended" size="medium"
                onClick={(e) => handleAll(e)}
                sx={{ color: "blue", background: "whitesmoke", fontWeight: "bold" }}
                className="bg-[whitesmoke] shadow-lg shadow-[lightgrey]"
              >
                submit to graph
              </Fab>
            }
            {msg_S && <div className="text-lg text-center">{msg_S}</div>}
            {msgX && <div className="text-lg text-center">{msgX}</div>}
          </div>
        </div>
      </div>

      <h3 className="text-lg text-center text-center">your submitted data:</h3>
      <div className="flex flex-row flex-wrap justify-start items-center my-2 lg:mx-auto lg:container px-2 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg overflow-x-scroll w-full lg:w-1/2 gap-2">

        {groupSeries.length > 0 &&
          groupSeries.map((series, index) => (
            <div className="mx-auto my-2" key={`${series.name}-${index}`}>
              <h3 className="text-xl m-auto">{series.name}</h3>
              <h3 className="text-md m-auto">{JSON.stringify(series.data)}</h3>
            </div>
          ))
        }


      </div>
    </div>
  )
}

export default ApexMainPage