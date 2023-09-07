import React from 'react';
import {lineStrokeType} from "./types";
import {FormControl,FormHelperText} from "@mui/material";
import {GeneralApexChart} from "@/components/context/GeneralContext";

// This is under options>>stroke

type mainLineStrokeType={
    type:any,
}
const LineAttrib = ({type}:mainLineStrokeType) => {
    const {setLineStroke}=React.useContext(GeneralApexChart);
    const [curve,setCurve]=React.useState<'smooth' | 'straight' | 'stepline' | string>();

    React.useEffect(()=>{
        setLineStroke(
            {
                show:true,
                curve:curve
            }
        )
    },[curve,setLineStroke]);

  return (
    <div className="w-full my-2 p-2">
            {type==="line" &&
                <div className="w-full flex flex-col items-center justify-center gap-2 ">
                    <FormControl
                        className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                    >
                        <div className="text-xl text-center text-blue font-bold">line curve?</div>
                        <select
                            name="curve"
                            value={curve}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurve(e.target.value)}
                        >
                            <option value="smooth">smooth</option>
                            <option value="straight">straight</option>
                            <option value="stepline">stepline</option>
                            </select>
                        <FormHelperText className="dark:text-white text-blue mt-2">select curve type</FormHelperText>
                    </FormControl>
                </div>
            }
        </div>
  )
}

export default LineAttrib