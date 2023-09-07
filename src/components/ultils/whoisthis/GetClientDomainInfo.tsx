"use client";
import React,{MouseEvent} from 'react';
import getDomainInfo, { whoDomainType,whoDomainType2 } from './getDomainInfo';
import { FormControl,FormHelperText,Input } from '@mui/material';
import DomainDetail from "./DomainDetail";
type whoDomType={
    loaded:boolean,
    data:whoDomainType | undefined | null
}
const GetClientDomainInfo = () => {
    const [domain, setDomain] = React.useState<string | null>(null);
    const [tempDomain, setTempDomain] = React.useState<string | null>(null);
    const [getResults_, setGetResults_] = React.useState<whoDomType >({loaded:false,data:null});
    const [msg,setMsg]=React.useState<string | null>(null);
    const REGEX_domain:RegExp=/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g;
    const whoDomType={} as whoDomainType;
    React.useMemo(async () => {
        if (domain) {
            
            const getData = await getDomainInfo(domain);
            setGetResults_({data:getData,loaded:true})
        }
    }, [domain]);

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        if (tempDomain && REGEX_domain.test(tempDomain)) {
            setDomain(tempDomain);
            setTempDomain(null);
            setMsg(null);
        }else{
            setMsg("not a valid domain")
        }

    }
    const handleReset = (e: MouseEvent) => {
        e.preventDefault();
            setDomain(null);
            setTempDomain(null);
            setMsg(null);
            setGetResults_({loaded:false,data:null});

    }
    return (
        
            <div className="flex flex-col items-center justify-center my-2 p-2">
                <div className=" m-auto flex flex-row items-center justify-center my-2 gap-2">
                    <FormControl className="m-auto px-2 p-2 m-2 border-2 border-blue shadow-md shadow-blue bg-white dark:bg-white text-blue">
                        <h3 className="text-center text-md bg-white text-black">Enter domain</h3>
                        <Input
                            name="getEmail"
                            value={tempDomain ? tempDomain : ""}
                            onChange={(e: React.ChangeEvent< HTMLInputElement>) => setTempDomain(e.target.value)}
                        />
                        {!msg ? <FormHelperText className="m-auto p-2 px-3 bg-white text-green" style={{color:"black"}}>example.com</FormHelperText>
                        :
                        <FormHelperText className="m-auto p-2 px-3 bg-black text-white" style={{color:"white"}}>{msg}</FormHelperText>}
                    </FormControl>
                    
                    <div className="flex flex-col justify-center items-center">
                        <button className="text-center text-md p-2 px-4 rounded-lg border border-black shadow-lg shadow-blue hover:bg-blue hover:tracking-wide hover:shadow-xl bg-site_blue_dark text-white" onClick={(e) => handleSubmit(e)}>Submit</button>
                        {domain && <button className="text-center mt-2 text-md p-2 px-4 rounded-lg border border-black shadow-lg shadow-blue hover:bg-blue bg-site_blue_dark text-white hover:tracking-wide hover:shadow-xl" onClick={(e) => handleReset(e)}>reset</button>}
                    </div>
                </div>
                {(getResults_.loaded) && <DomainDetail getResults={getResults_.data} />}
            </div>
       
    )

}

export default GetClientDomainInfo