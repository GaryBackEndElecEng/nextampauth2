"use client";
import React, { MouseEvent } from 'react'
import getDNSlookup, { dnslookupType } from "./getDNSlookup";
import { FormHelperText, FormControl, Input } from '@mui/material';
import GetDNSresults from "./GetDNSresults";
import Button from "@component/component/Button";


const GetClient_DNSlookup = () => {
  const [getResult, setGetResult] = React.useState<dnslookupType | undefined>(undefined);
  const [dns, setDns] = React.useState<string | null>(null);
  const [dnsTemp, setDnsTemp] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);
  const REGEX_domain: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g;
  const notlookupType = {} as dnslookupType;

  React.useMemo(async () => {
    if (dns) {
      const getDNS = await getDNSlookup(dns);
      if (getDNS) {
        setGetResult(getDNS);

      }
    }
  }, [dns, setGetResult]);

  const handleDNS = (e: MouseEvent) => {
    e.preventDefault();
    if (dnsTemp && REGEX_domain.test(dnsTemp)) {
      setDns(dnsTemp);
      setMsg(null);
      setDnsTemp(null);
    } else {
      setMsg(" Not a valid domain")
    }
  }
  const handleReset = () => {
    setDns(null);
    setGetResult(undefined);
    setDnsTemp(null);
  }
  return (
    <div className="flex flex-col justify-center items-center my-2 w-full shadow-lg shadow-blue rounded-lg p-2 gap-2">
      <div className="flex flex-row justify-center items-center my-2 w-full gap-2">
        <FormControl className="bg-white text-black rounded-lg shadow-lg shadow-blue flex flex-col gap-2 text-center">
          <h3 className="text-lg ">DNS lookup</h3>
          <Input
            name="dns"
            value={dnsTemp ? dnsTemp : ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setDnsTemp(e.target.value)}
          />
          {!msg ?
            <FormHelperText className="text-lg text-center bg-white text-black p-1 px-2" style={{ color: "black" }}>example.com</FormHelperText>
            :
            <FormHelperText className="text-lg text-center bg-black text-white  p-1 px-2" style={{ color: "white" }}>{msg}</FormHelperText>
          }
        </FormControl>
        <div className="flex flex-col justify-center items-center ">
          <Button onClick={(e) => handleDNS(e)}>Submit</Button>
          {dns && <Button onClick={() => handleReset()}>reset</Button>}
        </div>
      </div>

      {(getResult && notlookupType) && <GetDNSresults getResults={getResult} />

      }
    </div>
  )
}

export default GetClient_DNSlookup