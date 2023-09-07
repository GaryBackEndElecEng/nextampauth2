import React from "react";
// import styles from "./contact.module.css";
import { Input, InputLabel, FormControl,FormHelperText } from "@mui/material";
// import styled from "styled-components";

type CellInputType={
  cell:string | undefined,
  setCell:React.Dispatch<React.SetStateAction<string |undefined>>,
  sent:boolean
 
}

const CellInput = ({cell,setCell,sent}:CellInputType) => {

  React.useEffect(()=>{
    if(sent){
      setCell("")
    }
  },[sent,setCell]);

  return (
    <FormControl size="medium" variant="filled">
      <InputLabel
        focused={false}
        htmlFor="Cell"
        sx={{ color: "white", fontFamily: "Philosopher" }}
      >
        cell number
      </InputLabel>
      <Input
        name="cell"
        id="cell"
        placeholder="contact"
        value={cell}
        onChange={(e) => setCell(e.target.value)}
        margin={"dense"}
        required={false}
        sx={{ boxShadow: "1px 1px 3px 1px white" }}
      />
      <FormHelperText>enter a contact number ( not required)</FormHelperText>
    </FormControl>
  );
};

export default CellInput;