"use client";
import React from "react";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl,FormHelperText } from "@mui/material";
// import styled from "styled-components";
type formType={
  fullName:string |null,
  cell:string |undefined,
  email:string |null,
  content:string | null,
  
}
type EmailInputType={
  setEmail:React.Dispatch<React.SetStateAction<string | null>>,
  formData:formType | null,
  sent:boolean 
}
const EmailInput = ({setEmail,formData,sent}:EmailInputType) => {
  const [tempEmail,setTempEmail]=React.useState<string>("");
  const [msg,setMsg]=React.useState<{loaded:boolean,msg:string }>({loaded:false,msg:"enter name@email.com form please"});

  React.useEffect(()=>{
    const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email_REGEX.test(tempEmail)){
      setEmail(tempEmail);
      setMsg( {loaded:true,msg:" thank you "});
      
    }
  },[tempEmail,setEmail]);
  
  React.useEffect(()=>{
    if(formData && sent){
      setTempEmail("");
      setMsg({loaded:false,msg:""});
    }
  },[formData,sent]);

  return (
    <FormControl size="medium" variant="filled" className={styles.formControl}>
      <InputLabel
        focused={false}
        htmlFor="email"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        email
      </InputLabel>
      <Input
        name="email"
        placeholder="email please"
        value={tempEmail}
        onChange={(e) => setTempEmail(e.target.value)}
        margin={"dense"}
        required={true}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
      {msg.loaded ? 
      <FormHelperText sx={{backgroundColor:"black",color:"white"}}
      className="text-center rounded-lg"
      >{msg.msg}
      </FormHelperText>
      :
      <FormHelperText sx={{backgroundColor:"white",color:"blue"}}
      className="text-center"
      >{msg.msg}
      </FormHelperText>
      }
    </FormControl>
  );
};

export default EmailInput;