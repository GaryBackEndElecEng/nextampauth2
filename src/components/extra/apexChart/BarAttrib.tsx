import React from 'react';
import { plotOptionsType, graphType_type, barType, barDataLabelType } from "./types";
import { FormHelperText, FormControl, Input, } from '@mui/material';
import BarDataLabels from "./BarDataLabels";
import {GeneralApexChart} from "@/components/context/GeneralContext";



type MainBarAttribType = {
    type: graphType_type,
}

function switchFunc(isFunnel: boolean, isDumbell: boolean) {
    switch (true) {
        case isFunnel && isDumbell:
            return true;
        case isFunnel || isDumbell:
            return false;
    }
}

const BarAttrib = ({ type }: MainBarAttribType) => {
    const {setBar,barlabels, setBarlabels}=React.useContext(GeneralApexChart);
    const [isBar, setIsBar] = React.useState<boolean>(false);
    
    const [horizontal, setHorizontal] = React.useState<boolean>(false);
    const [isDumbbell, setIsDumbbell] = React.useState<boolean>(false);
    const [isFunnel, setIsFunnel] = React.useState<boolean>(false);
    const [isDistribute, setIsDistribute] = React.useState<boolean>(false);
    const [isOverlap, setIsOverlap] = React.useState<boolean>(false);
    const [borderRad, setBorderRad] = React.useState<string>("0");

    React.useEffect(() => {
        if (type === "bar") {
            setIsBar(true);
            let test = switchFunc(isDumbbell, isFunnel)
            if (test && test === true) {
                setIsFunnel(false);
            }
            setBar(
                {
                    horizontal: horizontal,
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all",
                    columnWidth: "100%",
                    distributed: isDistribute,
                    rangeBarOverlap: true,
                    rangeBarGroupRows: isOverlap,
                    hideZeroBarsWhenGrouped: true,
                    borderRadius: parseInt(borderRad),
                    barHeight: "100%",
                    isDumbbell: isDumbbell,
                    isFunnel: isFunnel,
                    isFunnel3d: true,
                    dataLabels: barlabels
                }
            )
        }
    }, [type, setBar, isFunnel, horizontal, isDumbbell, isDistribute, isOverlap, borderRad, barlabels]);

    return (
        <div className="w-full  my-2 p-1">
            {isBar &&
                <div className="w-full flex flex-col items-center justify-center gap-2 ">
                    <FormControl
                        className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                    >
                        <div className="text-lg text-center text-blue font-bold">Bar alignment</div>
                        <input
                            name="name"
                            type="checkbox"
                            checked={horizontal}
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setHorizontal(e.target.checked)}
                        />
                        <FormHelperText className="dark:text-white text-blue mt-2">graph horizontal or vertical</FormHelperText>
                    </FormControl>
                    <div className="flex flex-row flex-nowrap justify-center items-center w-full">
                        <FormControl
                            className="flex flex-col items-center mt-3 gap-1 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                        >
                            <div className="text-md text-center text-blue font-bold">Dumbell- shape?</div>
                            <input
                                name="name"
                                type="checkbox"
                                checked={isDumbbell}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setIsDumbbell(e.target.checked)}
                            />
                            <FormHelperText className="dark:text-white text-black mt-2">Normal or dumbell shape</FormHelperText>
                        </FormControl>
                        <FormControl
                            className="flex flex-col items-center mt-3 gap-1 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                        >
                            <div className="text-lg text-center text-blue font-bold">Funnel- shape?</div>
                            <input
                                name="name"
                                type="checkbox"
                                checked={isFunnel}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setIsFunnel(e.target.checked)}
                            />
                            <FormHelperText className="dark:text-white text-black mt-2">Normal or funnel shape</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-center items-center w-full gap-1">
                        <FormControl
                            className="flex flex-col items-center mt-3 gap-1 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                        >
                            <div className="text-md text-center text-blue font-bold">Bar Color?</div>
                            <input
                                name="distribute"
                                type="checkbox"
                                checked={isDistribute}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setIsDistribute(e.target.checked)}
                            />
                            <FormHelperText className="dark:text-white text-black mt-2">color sets</FormHelperText>
                        </FormControl>
                        <FormControl
                            className="flex flex-col items-center mt-3 gap-2 dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                        >
                            <div className="text-md text-center text-blue font-bold">Overlap Sets?</div>
                            <input
                                name="distribute"
                                type="checkbox"
                                checked={isOverlap}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setIsOverlap(e.target.checked)}
                            />
                            <FormHelperText className="dark:text-white text-black mt-2">color sets</FormHelperText>
                        </FormControl>
                        <FormControl
                            className="flex flex-col items-center mt-3  dark:text-blue text-blue dark:bg-white bg-white p-2 m-2 shadow-md shadow-blue rounded-lg "
                        >
                            <div className="text-md text-center text-blue font-bold">Border radius?</div>
                            <input
                                name="border-radius"
                                value={borderRad}
                                className="text-center w-1/2"
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => setBorderRad(e.target.value)}
                            />
                            <FormHelperText className="dark:text-white text-black mt-2">number:one-to-50</FormHelperText>
                        </FormControl>
                    </div>
                    <BarDataLabels />
                </div>
            }
        </div>
    )
}

export default BarAttrib