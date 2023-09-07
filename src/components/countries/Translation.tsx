// "use client";
import React from 'react';


type officialAndCommonType={
    official:string|any,
    common:string|any
}
type officialCommonType={
    [key:string]:{official:string,common:string}
}
type translateConType={
    key:string,
    official:string,
    common:string
}

type incommingTranslateType={
    official:officialAndCommonType | any,
    common:officialAndCommonType | any
}
type mainTranslationType = {
    translation:officialCommonType,
    show:boolean

}


const Translation = ({ translation,show }: mainTranslationType) => {
    const [translateCon,setTranslateCon]=React.useState<translateConType[]>([]);

    React.useEffect(()=>{
        let arr:translateConType[]=[];
        for(const [key,value] of Object.entries(translation)){
            arr.push({key:key,official:value.official,common:value.common});
            
        }
        setTranslateCon(arr);
        
    },[translation]);


    return (
        <div className="flex flex-col items-center justify-start  bg-white p-2 rounded-lg shadow-lg shadow-blue dark:bg-black dark:text-white dark:shadow-white w-full">
        <div className={show ? " relative flex flex-col justify-start items-center relative h-[20vh] overflow-y-scroll bg-white w-full": " flex flex-col justify-start items-center relative w-full"}>
        <div className="w-full m-auto absolute inset-0 ">
            {
                translateCon.map((obj,index)=>(
                    <div className="flex flex-col items-center justify-start  bg-white p-2 rounded-lg shadow-lg shadow-blue dark:bg-black dark:text-white dark:shadow-white w-full" key={index}>
                        <h3 className="text-lg my-2 text-center font-bold">official</h3>
                        <h3 className="text-lg text-center ">{obj.official}</h3>
                        <h3 className="text-lg my-2 text-center font-bold">common</h3>
                        <h3 className="text-lg  text-center ">{obj.common}</h3>
                        
                        <h3 className="text-md my-2">Lang. abrev: {obj.key}</h3>
                    </div>
                ))
                
                
            }
            
        </div>
        </div>
        </div>
    )
}

export default Translation