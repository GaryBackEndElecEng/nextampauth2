import React, {MouseEvent} from 'react';
import {xaxisType,xaxis2DType} from './types';
import {FormControl,Input,FormHelperText,Fab} from "@mui/material";
import {GeneralApexChart} from "@/components/context/GeneralContext";

const XaxisInput = () => {
const {setXAxis,xaxis,xaxisInput,setXaxisInput,setMsgX,msgX}=React.useContext(GeneralApexChart);
  return (
    <div className="flex flex-col items-center justify-start p-2  w-full ">
      <FormControl className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg w-full">
        <div className="text-xl text-center dark:text-white text-blue px-2">Enter your x-axis labels</div>
        <Input
        name="data"
        className="w-full sm:w-3/4"
        value={xaxisInput ? xaxisInput : ""}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>setXaxisInput(e.target.value)}
        />
        <FormHelperText className="dark:bg:text-white text-black mt-2"> name1,name2,name3,,,</FormHelperText>
      </FormControl>
      
    </div>
  )
}

export default XaxisInput