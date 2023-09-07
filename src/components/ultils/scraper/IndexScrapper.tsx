"use client";
import React from 'react';
import Scrapper from "./Scrapper";
import InputForm from "./InputForm";

//https://www.amazon.ca/gp/new-releases/amazon-devices/ref=zg_bsnr_nav_0


export type inputType={
    setInputUrl:React.Dispatch<React.SetStateAction<string | null>>,
    inputUrl: string | null,
    setInputUrls: React.Dispatch<React.SetStateAction<string[] >>,
    inputUrls: string[]
}

const IndexScrapper = () => {
    const [inputUrl,setInputUrl]=React.useState<string|null>(null);
    const [inputUrls,setInputUrls]=React.useState<string[]>([]);
  return (
    <div className="flex flex-col justify-center items-center lg:mx-auto lg:container w-full lg:w-3/4">
        <InputForm
        inputUrl={inputUrl}
        setInputUrl={setInputUrl}
        inputUrls={inputUrls}
        setInputUrls={setInputUrls}
        />
        {inputUrls.length>0 && <div className="flex flex-col justify-center justify-center">
            <Scrapper
            urls={inputUrls}
            />
        </div>}
    </div>
  )
}

export default IndexScrapper