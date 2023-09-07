import React from "react";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl,FormHelperText } from "@mui/material";
// import styled from "styled-components";
type formType={
  fullName:string |null,
  cell:string |undefined,
  email:string |null,
  content:string | null
}
type nameInputType={
  setFullName:React.Dispatch<React.SetStateAction<string |null>>,
  formData:formType | null,
  sent:boolean
}
const FullNameInput = ({setFullName,formData,sent}:nameInputType) => {
  const [tempFullName,setTempFullName]=React.useState<string>("");
  const [msg,setMsg]=React.useState<{loaded:boolean,msg:string }>({loaded:false,msg:"enter first name and last name please"});

  React.useEffect(()=>{
    const fullname_REGEX=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    if(fullname_REGEX.test(tempFullName)){
      setFullName(tempFullName);
      setMsg( {loaded:true,msg:" thank you "});
    }
  },[tempFullName,setFullName]);

  React.useEffect(()=>{
    if(formData && sent){
      setTempFullName("");
      setMsg( {loaded:false,msg:""});
    }
  },[formData,sent,setFullName,setTempFullName]);

  return (
    <FormControl size="medium" variant="filled">
      <InputLabel
        focused={false}
        htmlFor="fullName"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        Full Name
      </InputLabel>
      <Input
        name="fullName"
        id="fullName"
        placeholder="full name"
        value={tempFullName}
        onChange={(e) => setTempFullName(e.target.value)}
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

export default FullNameInput;
