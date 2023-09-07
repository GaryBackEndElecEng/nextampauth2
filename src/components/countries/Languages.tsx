// "use client";
import React from 'react';
import { start } from 'repl';

type officialCommonType={
    [key:string]:{official:string,common:string}
}
type translateConType={
    key:string,
    official:string,
    common:string
    
}
type mainlangTYpe={
    lang:officialCommonType,
    showLang:boolean
}

const Languages = ({lang,showLang}:mainlangTYpe) => {
    const [getlang,setGetlang]=React.useState<translateConType[]| null>(null);
    
    React.useEffect(()=>{
        let arr:translateConType[]=[]
        for(const [key,value] of Object.entries(lang)){
            arr.push({key:key,official:value.official,common:value.common});
        }
        setGetlang(arr);
    },[lang]);

  return (
    <div className="flex flex-col items-center justify-start  bg-white p-2 rounded-lg shadow-lg shadow-blue dark:bg-black dark:text-white dark:shadow-white w-full">
        <div className={ showLang ? "flex flex-col overflow-y-scroll h-[20vh] p-1 relative w-full" :"flex flex-col  p-1 relative w-full"}>
            <div className="w-full m-auto absolute inset-0">
        {
            getlang && getlang.map((obj,index)=>(
                <div key={`${obj.key} - ${index}`}>
                    <h3 className="font-bold">Official</h3>
                    <h4>{obj.official}</h4>
                    <h3 className="font-bold">Common</h3>
                    <h4>{obj.common}</h4>
                    <h3 className="font-bold">Lang. key</h3>
                    <h4>{obj.key}</h4>
                </div>
            ))
        }
        </div>
        </div>
    </div>
  )
}

export default Languages