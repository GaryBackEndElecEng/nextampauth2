"use client";
import React,{MouseEvent} from 'react';
import axios from 'axios';
import {Fab,Container} from '@mui/material';
import Form from './Form';
import GetAPI from './GetAPI';
import type {msgType} from "@component/context/type";


type arrayType={
    definition:string,
    permalink:string,
    thumbs_up:number,
    author:string,
    word:string,
    defid:number
    current_vote:string,
    written_on:string,
    example:string,
    thumbs_down:number
}

type outputType={
    list: arrayType[]
}
type inputType={
    phrase:string | null,
    setGetOutput:React.Dispatch<React.SetStateAction<outputType | null>>
}




const FetchApi = () => {
    const [phrase,setPhrase]=React.useState<string | null>(null);
    const [msg,setMsg]=React.useState<msgType>({loaded:false,msg:" enter a slang word"});

    const handleReset=(e:MouseEvent<HTMLButtonElement | undefined>)=>{
        e?.preventDefault();
            setPhrase(null);
    }
    
    return (
        
        <div  className="lg:container lg:mx-auto  lg:p-1 flex flex-col items-center justify-center dark:bg-black dark:text-white bg-white text-black ">
            <h3 className="text-center text-xl p-2 my-2 font-bold">find a definition to a slang word</h3>
            <Form 
            phrase={phrase}
            setPhrase={setPhrase}
            setMsg={setMsg}
            msg={msg}
            />
            <GetAPI phrase={phrase} setMsg={setMsg}/>
            <div className="mx-auto my-3">
                <Fab variant="extended" color="primary"  onClick={(e)=>handleReset(e)}
                className="px-5 bg-black text-white hover:text-black hover:bg-blue hover:tracking-wider"
                >
                    reset
                </Fab>
            </div>
        </div>
        
    )
}

export default FetchApi