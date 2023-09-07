import React from 'react'
import {inputType} from "./IndexScrapper";
import {FormControl,Input,FormHelperText} from "@mui/material";

const InputForm = ({setInputUrl,setInputUrls,inputUrl,inputUrls}:inputType) => {
    const [msg,setMsg]=React.useState<string |null>(null);
    React.useEffect(()=>{
        const REGEX_https=/^(?:https:\/\/)([^\/])+(?:amazon.com\/)+[a-z0-9-]{0,61}/g;
        
        if(inputUrl && REGEX_https.test(inputUrl) ){
            setInputUrls([...inputUrls,inputUrl]);
            setMsg(null);
            setInputUrl(null);
        }else{
            setMsg("please enter the correct https://website.com")
        }
    },[inputUrl, setInputUrls, inputUrls, setInputUrl]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
        <FormControl className="m-auto">
            <div className="text-lg text-center mx-auto my-2"> insert an url to scrape</div>
            <Input
            id="url"
            value={inputUrl}
            onChange={(e)=>setInputUrl(e.target.value)}
            className="my-2 mx-auto w-full"
            />
            {!msg ?<FormHelperText className="my-2 mx-auto">https://domain.com</FormHelperText>
            :
            <FormHelperText className="my-2 mx-auto">{msg}</FormHelperText>
            }
        </FormControl>
    </div>
  )
}

export default InputForm