"use client";
import React from 'react';
import axios, { AxiosError,isAxiosError } from 'axios';
import api from "../../axios/api";

type currType={
    date:string,
    value:number,
    keyCmp:string | null
}
type getKeyType={
    getKey:{
    loaded:boolean,
    key:string
    }
}
type typeCurrType={currency:{ky:string,val:string}[]}

type mainTypes={
    keyCmp:string,
    getKey:{
        loaded:boolean,
        key:string
        }
}

//https://raw.githubusercontent.com/fawazahmed0/currency-api/1/2022-01-10/currencies/cmpKey/basekey.json
const Dollar = ({getKey,keyCmp}:mainTypes) => {
    const [getDollar,setGetDollar]=React.useState<currType | null>(null)
    
    const [rmDec,setRmDec]=React.useState<number>(0)
    
    React.useEffect(()=>{
        const date="2022-01-10"
        const url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`
        const curr:string=`${url}/${keyCmp}/${getKey.key}.json`;
        console.log(curr)
        async function getRate(){
            axios.defaults.xsrfHeaderName = 'Access-Control-Allow-Origin';
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            try {
                const res=await axios.get(curr)
                const body=res.data;
                setGetDollar({date:body.date,keyCmp:keyCmp,value:body[getKey.key]})
                
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.status)
                    console.error(error.response)
                }else{
                    console.error(error)
                }
            }
        }
        if(getKey.loaded && curr){
        getRate()
        }
    },[getKey,keyCmp]);

    const invertValue= React.useCallback(()=>{
        if (getDollar){
        const invert:string=(1/(getDollar.value)).toString()
        return parseFloat(invert).toFixed(3)
        }
    },[getDollar]);

  return (
    <div className="container mx-auto gap-2 my-2 mb-4 dark:bg-black dark:text-white bg-[rgba(255,255,255,0.7)] text-black">
    <div className="card flex flex-col p-4 my-3 mx-1 justify-center items-center bg-inherit gap-3 bg-[hsla(200,95%,90%,.4)]">
        <h2 className="text-3ml text-center font-bold">$ Rates</h2> 
        <h3 className="text-3ml text-center font-bold">base $:{getKey.key.toUpperCase()}</h3> 
        <h4 className="text-3ml text-center font-bold p-1 bg-stone-200 shadow-sm shadow-stone-500">Reg. date: {getDollar?.date}</h4> 
        <h4 className="text-3ml text-center font-bold text-blue-500 p-1 bg-stone-200 shadow-sm shadow-stone-500">selected Co $: { getDollar?.keyCmp?.toUpperCase()}</h4> 
        <h4 className="text-3ml text-center font-bold text-green-500 p-1 bg-stone-200 shadow-sm shadow-stone-500">rate: {getKey.key}$ {getDollar && parseFloat((getDollar.value).toString()).toFixed(3)}/{getDollar?.keyCmp}</h4> 
        <h4 className="text-3ml text-center font-bold text-red-500 p-1 bg-stone-200 shadow-sm shadow-stone-500">rate: {getDollar?.keyCmp}$ {getDollar && invertValue()}/{getKey?.key}</h4> 
    </div>
    
    </div>
  )
}

export default Dollar