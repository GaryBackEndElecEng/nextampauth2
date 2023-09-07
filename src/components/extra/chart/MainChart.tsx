"use client";
import React from 'react';
// import {ThemeProvider} from 'next-themes'
import axios from 'axios';
import DataInput from './DataInput';
import GenerateChart from './GenerateChart';

const charttypes=[
    {type:"line"},
    {type:"bar"},
    {type:"radar"},
    {type:"pie"},
    {type:"donut"},
]
type dounutlabelItemType={
    text:string,
    font:{
        size:number
    }
}

type dounutType={
    labels:dounutlabelItemType[]
}
type labelType={
    labels:string[],
}
type dataSetType={
    label:string,
    data:number[],
    fill:boolean,
    borderColor:string
}
type dataType={
    type:string,
    data:{
        labels:string[],
        datasets:dataSetType[] | null | undefined,
    },
    options?:{
        plugins:{
            doughnutLabel:{
                labels:dounutType
            }
        }
    }
}


const MainChart = () => {
    const [graphData,setGraphData]=React.useState<dataType | null>(null)
    const [summary,setSummary]=React.useState<string>("Summary here");
    const [name,setName]=React.useState<string>("");
    const [dataset,setDataset]=React.useState<dataSetType |null>(null);
    const [datasetArr,setDatasetArr]=React.useState<dataSetType[] | []>([]);
    const [labels,setLabels]=React.useState<string[] | []>([]);
    // console.log("UPPER dataset",dataset,"datasetArr",datasetArr,"graphData",graphData)
  return (
    // <ThemeProvider attribute="class">
    <div className="mx-0 my-2 w-full lg:mx-auto lg:container dark:bg-black dark:text-white bg-white text-black "
    >
    <div className={graphData ? `grid grid-cols-1 auto-cols-auto grid-flow-row-dense justify-items-center justify-center lg:grid-cols-3 gap-2`:"flex flex-col justify-center items-center  w-full"}>
    <div className={graphData ? "card w-full col-span-1 " : "card w-full lg:w-1/2"}>
    <DataInput 
    setGraphData={setGraphData}
    graphData={graphData} 
    setSummary={setSummary} 
    summary={summary}
    name={name}
    setName={setName}
    datasetArr={datasetArr}
    setDatasetArr={setDatasetArr}
    dataset={dataset}
    setDataset={setDataset}
    setLabels={setLabels}
    labels={labels}
     />
    </div>
    {graphData &&
    <div className="card col-span-2">
        <GenerateChart graphData={graphData} summary={summary} name={name} />
    </div>
    }
    </div>
    </div>
    // </ThemeProvider>
  )
}

export default MainChart;