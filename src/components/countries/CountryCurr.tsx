// "use client";
import React from 'react';
import { Country } from "world-countries";
import { countrycurrType } from "@/components/countries/types";

type mainCurencyType = {
    currency: countrycurrType,
    showCurr: boolean
}
type countryCurrType = {
    key: string,
    name: string,
    symbol: string
}

const CountryCurr = ({ currency, showCurr }: mainCurencyType) => {
    const [currArr, setCurrArr] = React.useState<countryCurrType[] | null>(null);

    React.useEffect(() => {
        let arr: countryCurrType[] = [];
        for (const [key, value] of Object.entries(currency)) {
            arr.push({ key: key, name: value.name, symbol: value.symbol })
        }
        setCurrArr(arr);
    }, [currency]);

    return (
        <div className="flex flex-col items-center justify-start  bg-white p-2 rounded-lg shadow-lg shadow-blue dark:bg-black dark:text-white dark:shadow-white w-full">
            <div className={showCurr ? "flex flex-col overflow-y-scroll h-[20vh] p-1 relative w-full" : "flex flex-col  p-1 relative"}>
                <div className="w-full m-auto absolute inset-0">
                {
            currArr && currArr.map((obj,index)=>(
                <div key={`${obj.name} - ${index}`}>
                    <h3 className="font-bold">Name</h3>
                    <h4>{obj.name}</h4>
                    <h3 className="font-bold">symbol</h3>
                    <h4>{obj.symbol}</h4>
                    <h3 className="font-bold">abrev. key</h3>
                    <h4>{obj.key}</h4>
                </div>
            ))
        }
                </div>
            </div>
        </div>
    )
}

export default CountryCurr