import React,{MouseEvent} from 'react'
import {seriesType,series2DType} from './types';
import {FormControl,Input,FormHelperText,Fab} from "@mui/material";
import {GeneralApexChart} from "@/components/context/GeneralContext";


const SeriesInput = () => {
  const {serie,setSerie,setNameS,nameS,addSeriesCount,groupSeries}=React.useContext(GeneralApexChart);
  
  return (
    

    <div className="flex flex-col items-center justify-start gap-2 w-full ">
      <FormControl className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg ">
        <div className="text-xl text-center">Enter {addSeriesCount.length} series name</div>
        <Input
        name="name"
        value={nameS ? nameS : ""}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>setNameS(e.target.value)}
        />
        <FormHelperText className="dark:bg:text-white text-black mt-2">name for your {addSeriesCount[addSeriesCount.length-1]} series, below</FormHelperText>
      </FormControl>
      <FormControl className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg w-full">
        <div className="text-xl text-center">Enter your {addSeriesCount.length} data points</div>
        <Input
        name="data"
        className="w-full sm:w-3/4"
        value={serie ? serie : ""}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>setSerie(e.target.value)}
        />
        <FormHelperText className="dark:bg:text-white text-black mt-2"> num1,num2,num3,,,</FormHelperText>
      </FormControl>
      
    
    </div>
  )
}

export default SeriesInput