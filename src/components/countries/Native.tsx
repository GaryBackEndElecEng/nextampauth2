// "use client";
import React from 'react';

type officialCommonType={
    [key:string]:{official:string,common:string}
}
type nativeType={
    key:string,
    official:string,
    common:string
}
type mainNativeTYpe={
    native:officialCommonType,
    showNative:boolean
}

const Native = ({native,showNative}:mainNativeTYpe) => {
    const [getNative,setGetNative]=React.useState<nativeType[]| null>(null);
    
    React.useEffect(()=>{
        let arr:nativeType[]=[]
        for(const [key,value] of Object.entries(native)){
            arr.push({key:key,official:value.official,common:value.common});
        }
        setGetNative(arr);
    },[native]);

  return (
    <div className="flex flex-col items-center justify-start  bg-white p-2 rounded-lg shadow-lg shadow-blue dark:bg-black dark:text-white dark:shadow-white w-full">
        <div className={ showNative ? "flex flex-col overflow-y-scroll h-[20vh] p-1 relative w-full" :"flex flex-col  p-1 relative w-full"}>
            <div className="w-full m-auto absolute inset-0 ">
        {
            getNative && getNative.map((obj,index)=>(
                <div key={`${obj.official} - ${index}`}>
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

export default Native