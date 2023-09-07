import React from 'react';
import { legendType } from './types';
import {FormControl,FormHelperText} from "@mui/material";
import {GeneralApexChart} from "@/components/context/GeneralContext";

type positionType='top' | 'right' | 'bottom' | 'left';


const Legend = () => {
    const {setLegend}=React.useContext(GeneralApexChart);
    const [ show,setShow]=React.useState<boolean>(true);
    const position_='top' || 'right' || 'bottom' || 'left';
    const [ position,setPosition]=React.useState<positionType>();
    const [ tempPosition,setTempPosition]=React.useState<string | undefined>();
    
    React.useEffect(()=>{
        switch(tempPosition){
            case "top":
                setPosition("top");
                break;
            case "right":
                setPosition("right");
                break;
            case "bottom":
                setPosition("bottom");
                break;
            case "left":
                setPosition("left");
                break;
            default:
                setPosition("top");
                return
        }
    },[tempPosition]);

    React.useEffect(()=>{
        setLegend({
            show:show,
            showForSingleSeries:show,
            floating:false,
            position:position,
            horizontalAlign:"center",
            fontSize:"16px",
            fontWeight:600,
            labels:{useSeriesColors:true},
            markers:{
                strokeColor:"green"
            },
            
        })
    },[setLegend,show,position]);

  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full">
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 ">
            <FormControl
                className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
            >
                <h3 className="text-md text-center text-blue font-bold">Show Legend?</h3>
                <input
                    name="curve"
                    type="checkbox"
                    checked={show}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShow(e.target.checked)}
                />
                <FormHelperText className="dark:text-white text-blue mt-2">Show legend</FormHelperText>
            </FormControl>
            <FormControl
                className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
            >
                <h3 className="text-md text-center text-blue font-bold">legend position?</h3>
                <select
                    name="curve"
                    value={tempPosition}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTempPosition(e.target.value)}
                >
                    <option value="top">top</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                    <option value="bottom">bottom</option>
                    </select>
                <FormHelperText className="dark:text-white text-blue mt-2">legend position</FormHelperText>
            </FormControl>
        </div>
    </div>
  )
}

export default Legend