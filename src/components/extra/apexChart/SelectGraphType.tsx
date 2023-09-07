import React,{MouseEvent} from 'react'
import {GeneralApexChart} from "@/components/context/GeneralContext";
import {FormControl,Input,FormHelperText,Fab} from "@mui/material";
import BarAttrib from "./BarAttrib";
import LineAttrib from "./LineAttrib";
import Legend from './Legend';

type mainSelectGraphType={
    typeArr:string[],
    
}
const SelectGraphType = ({typeArr}:mainSelectGraphType) => {
    const {setGraphType,setLineStroke}=React.useContext(GeneralApexChart);
    const [selectGraph,setSelectGraph]=React.useState<string | any>("line")

    React.useEffect(()=>{
        setGraphType(selectGraph);
    },[selectGraph,setGraphType]);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 my-2 shadow-md shadow-blue rounded-lg">
        <FormControl
        className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
        >
            <div className="text-xl text-center"> graph type</div>
            <select
            name="name"
            value={selectGraph}
            onChange={(e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>setSelectGraph(e.target.value)}
            >
                {typeArr.map((obj,index)=>(
                    <option value={obj} key={index}>
                        {obj}
                    </option>
                ))}
            </select>
            <FormHelperText className="dark:bg:text-white text-black mt-2">choose your graph type</FormHelperText>
        </FormControl>
        {(selectGraph==="line") && 
        <LineAttrib type={selectGraph}/>
        }
        {(selectGraph==="bar") && 
        <BarAttrib type={selectGraph}/>
        }
        <Legend/>
    </div>
  )
}

export default SelectGraphType