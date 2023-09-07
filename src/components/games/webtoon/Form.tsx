"use client";
import React,{MouseEvent} from 'react';
import {Input,InputLabel,FormControl,FormHelperText} from "@mui/material";

type listType={
    
    name:string,
    value:string

}[]
type inputType={
    setLang:React.Dispatch<React.SetStateAction<string | undefined>>,
    setQuery:React.Dispatch<React.SetStateAction<string>>
    list:listType
    setGetAPI:React.Dispatch<React.SetStateAction<boolean>>
}
const Form = ({setLang,setQuery,list,setGetAPI}:inputType) => {
    const [tempLang,setTempLang]=React.useState<string | undefined>("");
    const [tempQuery,setTempQuery]=React.useState<string | undefined>("");
    const handleSubmit=(e:MouseEvent<HTMLButtonElement> | undefined)=>{
        e?.preventDefault();
        if(tempLang && tempQuery){
            setLang(tempLang);
            setQuery(tempQuery);
            setGetAPI(true);
            // console.log("sent",tempLang,tempQuery)
        }
    }
  return (
    <div className="flex flex-col mx-auto justify-start items-center">
            <form action="" className="flex flex-col mx-auto my-2 p-3 justify-center items-center">
                <FormControl className="mx-auto my-2 p-2 dark:bg-white dark:text-black">
                <InputLabel htmlFor="query" shrink={true} className="label m-auto pb-1 text-center my-3 p-2">category</InputLabel>
                <Input
                 id="query"
                 type="text"
                 name="query"
                 className="mx-auto bg-stone-300 dark:bg-white dark:text-black my-2"
                 value={tempQuery}
                 onChange={(e)=>setTempQuery(e.target.value)}
                 />
                 <FormHelperText className="dark:bg-white dark:text-black">maximum two words(ie; boy friend,,,)</FormHelperText>
                </FormControl>
                <FormControl className="mx-auto my-4 p-3 dark:bg-white dark:text-black">
                <InputLabel htmlFor="lang" shrink={true} className="label verticalTop dark:bg-white dark:text-black " >language</InputLabel>
                <select
                 id="lang"
                 name="lang"
                 className="mx-auto bg-stone-300 dark:bg-white dark:text-black my-4 "
                 value={tempLang ? tempLang : "select"}
                 onChange={(e)=>setTempLang(e.target.value)}
                 
                 >
                    {list && list.map((obj,index)=>(
                        <option value={obj.value} key={index}>{obj.name}</option>
                    ))}
                </select>
                </FormControl>
                {tempLang &&
                <button type="submit" className="p-1 rounded-lg bg-indigo-500 shadow-md shadow-blue dark:bg-white dark:text-black my-4" onClick={(e)=>handleSubmit(e)}>submit</button>
                }
            </form>
            </div>
  )
}

export default Form