"use client";
import React, { MouseEvent } from 'react'
import getDomainVerification from '@/components/ultils/emailTool/getDomainVerification';
import { FormControl, Input, FormHelperText } from "@mui/material";

type domaineResType = {
  valid: boolean,
  block: boolean,
  disposable: boolean,
  domain: string,
  text: string,
  reason: string,
  risk: 8
  mx_host: string,
  possible_typo: string[],
  mx_ip: string,
  mx_info: string,
  last_changed_at: string
}

const GenResponse = () => {
  const [verify, setVerify] = React.useState<domaineResType | undefined>();
  const [email, setEmail] = React.useState<string | undefined>();
  const [tempEmail, setTempEmail] = React.useState<string | null>(null);
  const [ msg,setMsg]=React.useState<string | null>(null)

  const email_REGEX:RegExp=/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

  React.useMemo(async () => {
    
    if (email) {
      const getRes = await getDomainVerification(email);
      setVerify(getRes);
    }
  }, [email]);
  const handleGetEmail = (e: MouseEvent) => {
    e.preventDefault();
    if(tempEmail && email_REGEX.test(tempEmail)){
    setEmail(tempEmail);
    setTempEmail(null);
    setMsg(null);
    }else{
      setMsg("not a valid email")
    }
  }
  return (
    <div className="lg:mx-auto lg:container flex flex-col items-center justify-center my-2 p-2 ">
      <div className="flex flex-row items-center justify-center my-2 px-2">
        <FormControl className="m-auto px-2 p-2 m-2 border-2 border-blue shadow-md shadow-blue bg-white">
          <h3 className="text-center text-md"> verify an Email</h3>
          <Input
            name="getEmail"
            value={tempEmail? tempEmail:""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTempEmail(e.target.value)}
          />
          {!msg ? <FormHelperText className="m-auto p-2 px-3 bg-white text-black" style={{color:"black"}}>example@email.com</FormHelperText>
          :
          <FormHelperText className="m-auto p-2 px-3 bg-black text-white" style={{color:"white"}}>{msg}</FormHelperText>}
        </FormControl>
        <div className="flex flex-col justify-center items-center my-2  pl-3">
          <button className="text-center text-md p-2 px-4 rounded-lg border border-black shadow-lg shadow-blue hover:bg-blue hover:tracking-wide hover:shadow-xl bg-site_blue_dark text-white" onClick={(e) => handleGetEmail(e)}>Submit</button>
        </div>
      </div>
      {verify &&
        <div className="flex flex-col mx-auto w-full my-2 shadow-lg shadow-blue rounded-lg p-2">
          <h3 className="text-md m-auto">block:{verify.block}</h3>
          <h3 className="text-md m-auto">domain:{verify.domain}</h3>
          <h3 className="text-md m-auto">isValid:{verify.valid}</h3>
          <h3 className="text-md m-auto">IP:{verify.mx_ip}</h3>
          <h3 className="text-md m-auto">risk?:{verify.risk}</h3>
          <h3 className="text-md m-auto">response:{verify.text}</h3>
          <h3 className="text-md m-auto">reason:{verify.reason}</h3>
          <div className="flex flex-row justify-around items-center p2 m-2">
          <small className="text-xs m-auto"><span className="font-bold">registered:</span>
          <small className="text-xs m-auto">{verify.last_changed_at}</small>
          </small>
          <small className="text-xs m-auto"><span className="font-bold">detail:</span>
          <small className="text-xs m-auto">{verify.mx_info}</small>
          </small>
          </div>
        </div>
      }
    </div>
  )
}

export default GenResponse