import React from 'react'
import {iddType} from "./types";

const IddTel = ({idd}:{idd:iddType}) => {
const isMore=idd.suffixes.length>10 ? true:false;
  return (
    <div className="m-auto flex flex-col justify-center items-center shadow-lg shadow-blue dark:shadow-white gap-1">
        <h3 className="text-lg mx-auto my-2 font-bold">Tel prefix & area codes</h3>
        <h3 className="text-lg mx-auto my-2 font-bold">prefix:{idd.root}</h3>
        <h3 className="text-lg mx-auto my-2 font-bold">Area code</h3>
        <hr className="border-2 h-[5px] mb-1 border-blue w-[100%] dark:border-white"/>
        <div className={isMore ? "text-lg mx-auto grid grid-cols-5 px-3  h-[30vh] overflow-y-scroll" : "text-lg mx-auto grid grid-cols-5 px-3  h-[5vh] overflow-y-scroll"}>
            {
        idd.suffixes.map((str,index)=>(
            <div className="m-auto text-center col-span-1" key={index}>
                {str},
            </div>
        ))
        }
        </div>
    </div>
  )
}

export default IddTel