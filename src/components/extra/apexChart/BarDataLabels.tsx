import React from 'react';
import {barDataLabelType,BarLabelTotalType} from './types';
import { FormHelperText, FormControl, Input, } from '@mui/material';
import {GeneralApexChart} from "@/components/context/GeneralContext";


const BarDataLabels = () => {
    const {setBarlabels}=React.useContext(GeneralApexChart);
    const [position,setPosition]=React.useState<string | undefined>("top");
    const [total,setTotal]=React.useState<BarLabelTotalType | undefined>(
        {
            enabled: true,
            offsetX: 0,
            offsetY: 0,
            style: {
            color: "white",
            fontSize: "10px",
            fontWeight: 500
            }
        }
    );

    React.useMemo(()=>{
        setTotal(
            {
                enabled: true,
                offsetX: 0,
                offsetY: 0,
                style: {
                color: "white",
                fontSize: "10px",
                fontWeight: 500
                }
            }
        )
    },[]);

    React.useEffect(()=>{
        setBarlabels(
            {
                position: position,
                maxItems: 150,
                hideOverflowingLabels: true,
                total:total
            }
        )
    },[position,setBarlabels,total]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 w-full ">
        <FormControl
            className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
        >
            <div className="text-xl text-center text-blue font-bold">bar label</div>
            <select
                name="label"
                value={position}
                onChange={(e: React.ChangeEvent<HTMLSelectElement >) => setPosition(e.target.value)}
            >
                <option value={"bottom"}>bottom</option>
                <option value={"top"}>top</option>
            </select>
            <FormHelperText className="dark:text-white text-blu mt-2">bar number</FormHelperText>
        </FormControl>
    </div>
  )
}

export default BarDataLabels