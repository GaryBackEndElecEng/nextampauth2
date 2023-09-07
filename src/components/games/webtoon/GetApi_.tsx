
"use client";
import React from 'react';
import axios, { AxiosError,isAxiosError } from "axios";
import Image from 'next/image';
import ApiDisplay from './ApiDisplay';
import Form from './Form';
import {Input,InputLabel,FormControl,FormHelperText} from "@mui/material";


type webtoonItemType={
titleNo:number,
title:string,
writingAuthorName:string,
representGenre:string,
thumbnail:string,
serviceStatus:string,
newTitle:boolean,
starScoreAverage:number,
readCount:number,
likeitCount:number,
lastEpisodeRegisterYmdt:number,
totalServiceEpisodeCount:number,
registerYmdt:number
}
type titListType={
    titleList:webtoonItemType[]
}
type challengSearchType={
    name:string,
    index:number,
    iconImage:string,
    code:string
}[]
type listType={
    
    name:string,
    value:string

}[]
type inputType={
    list:listType,
    reset:boolean,
    setReset:React.Dispatch<React.SetStateAction<boolean>>,
    setGetAPI:React.Dispatch<React.SetStateAction<boolean>>,
    getAPI:boolean
}
const GetApi_ = ({list,reset,setReset,setGetAPI,getAPI}:inputType) => {
    const [getBodyArr,setGetBodyArr]=React.useState<challengSearchType | null>(null);
    const [query,setQuery]=React.useState<string>("");
    const [lang,setLang]=React.useState<string | undefined>("");
    const [sending,setSending]=React.useState<boolean>(false);
    const [error,setError]=React.useState<boolean>(false);

    React.useEffect(()=>{
        if(reset){
            setGetBodyArr(null);
            setReset(false);
        }
    },[reset,setReset]);
// console.log("here",lang,query,"getBody",getBodyArr)
    React.useEffect(()=>{
        const apiKey:string | undefined=process.env.NEXT_PUBLIC_rapidAip
        async function getApi(){
            var body:challengSearchType | null;
            const options = {
                method: 'GET',
                url: 'https://webtoon.p.rapidapi.com/canvas/genres/list',
                params: {language: lang},
                headers: {
                  'X-RapidAPI-Key':apiKey,
                  'X-RapidAPI-Host': 'webtoon.p.rapidapi.com'
                }
              };

            try {
                const res = await axios.request(options);
                body=res.data.message.result.genreTabList.genreTabs
                setGetBodyArr(body);
                setQuery("");
                setLang("");
                setGetAPI(false);
                setSending(true);
            } catch (error) {
                setError(true);
                if(axios.isAxiosError(error)){
                    console.log(error.status)
                    console.error(error.response)
                }else{
                    console.error(error)
                }
                
            }
        }
        if(lang !=="" && getAPI && apiKey){
        getApi();
        }
},[lang,getAPI,setGetAPI]);

  return (
    <div className="container mx-auto px-2 py-1 dark:bg-black dark:text-white">
        <div className="flex flex-col justify-start items-center">
        <Form 
        setLang={setLang}
        setQuery={setQuery}
        list={list}
        setGetAPI={setGetAPI}
        />
            { getBodyArr ? 
            <div className="container mx-auto px-3 py-4 dark:bg-white dark:text-black">
            <div className="flex flex-row w-3/4 items-center justify-center m-auto flex-wrap h-[36vh] overflow-y-scroll">
            {getBodyArr.map((obj,index)=>(
                <div className="mx-auto px-3 py-1 basis-1/4" key={`${obj.index}- ${index}`}>
                   <ApiDisplay obj={obj} query={query}/>
                </div>
            ))}
            </div>
            </div>
        :
            
            <div className="m-auto">
                {(sending && lang) ?
                <h3>loading...</h3>
                :
                <div className="container mx-auto">
                   {error && <h3 className="m-auto text-xl text-center">
                issues connecting to the server, try again later
                </h3>}
                </div>
                }
            </div>
            
        }
        </div>
    </div>
  )
}

export default GetApi_