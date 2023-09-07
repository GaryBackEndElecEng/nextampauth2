"use client";
import React,{MouseEvent} from 'react';
import {Input,FormControl,Grid, InputLabel} from '@mui/material';
import Image from 'next/image';
import type {msgType} from "@component/context/type";

type inputType={
    setPhrase:React.Dispatch<React.SetStateAction<string | null>>,
    phrase:string | null ,
    setMsg: React.Dispatch<React.SetStateAction<msgType>>,
    msg: msgType
}
const Form = ({setPhrase,phrase,setMsg,msg}:inputType) => {
  const staticImage=process.env.NEXT_PUBLIC_aws;
    const slang=`${staticImage}/slang.png`;
    const [tempPhrase,setTempPhrase]=React.useState<string | undefined>("");
    


    const handleSubmit=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
        e?.preventDefault();
        if(!phrase && tempPhrase){
        setPhrase(tempPhrase)
        setMsg({loaded:true,msg:" answers are comming"})
        }else{
          setMsg({loaded:false,msg:"imput any slang word then 'submit'"})
        }
    }
    // console.log("category in Form",category)
  return (
    <Grid container className=" w-full mb-6 dark:bg-black dark:text-white mt-3" spacing={{xs:4,md:1}}>
      <Grid item xs={12} md={2} className="mx-auto rounded-lg flex flex-col items-center justify-center">
        <Image src={slang} alt="www.masterconnect.ca" height={400} width={400}
        className="  inset-0 rounded-inherit"
        />

      </Grid>
      <Grid item xs={12} md={8}>
    <form action="" className="flex flex-col items-center justify-center  ">
    <FormControl className="flex flex-col justify-center items-center dark:bg-white dark:text-black rounded-lg">
        <InputLabel htmlFor="phrase" shrink={true} className="my-2">enter a slang</InputLabel>
        <br/>
        <Input
        name="phrase"
        placeholder="enter a slang word"
        id="phrase"
        value={tempPhrase}
        onChange={(e)=>setTempPhrase(e.target.value)}
        className="text-lg my-2 mx-2 px-2 rounded-lg"
        />
        <button type="submit" className="button my-2" onClick={(e)=>handleSubmit(e)}>submit</button>
    </FormControl>
    {
     (msg && msg.loaded) ? 
    <div className="text-lg text-center text-blue font-bold p-2 shadow-md shadow-blue rounded-md">{msg.msg}</div>
    :
    <div className="text-lg text-center text-orange font-bold">{msg.msg}</div>
    }
    </form>
    </Grid>
    <Grid item xs={12} md={2} className="mx-auto rounded-lg flex flex-col items-center justify-center">
      <Image src={slang} alt="www.masterconnect.ca" height={400} width={400}
      className="  inset-0 w-full"
      />

    </Grid>

    </Grid>
  )
}

export default Form