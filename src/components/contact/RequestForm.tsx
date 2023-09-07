"use client";
import React, {MouseEvent} from "react";
import styles from "./contact.module.css";
import { Stack, Grid, Container, Typography, Fab } from "@mui/material";
import FullNameInput from "./FullNameInput";
import EmailInput from "./EmailInput";
import ContentInput from "./ContentInput";
import CellInput from './CellInput';
import axios, { AxiosError } from 'axios';
import api from '../axios/api';
import ChatWithUs from  './ChatWithUs';

type formType={
  fullName:string |null,
  cell:string |undefined,
  email:string |null,
  content:string | null
}

type contactMsgType={
  loaded:boolean,
  data:formType,
  msg:string
}
const RequestForm = () => {
  const [formData,setFormData]=React.useState<formType | null>(null);
    const [fullName,setFullName]=React.useState<string | null>(null);
    const [email,setEmail]=React.useState<string | null>(null);
    const [cell,setCell]=React.useState<string | undefined>("");
    const [content,setContent]=React.useState<string | null>(null);
    const [sent,setSent]=React.useState<boolean>(false);
    const postRequest = `/postRequest/`;
    const [contactMsg,setContactMsg]=React.useState<contactMsgType>({loaded:false,data:{email:"",fullName:"",content:"",cell:""},msg:""});

    React.useMemo(()=>{
      if(fullName && email && content){
        setFormData({
          fullName:fullName,
          email:email,
          content:content,
          cell:cell
        })
      }
    },[fullName,email,cell,content])
      

    const handleSubmit=(e:MouseEvent)=>{
        e.preventDefault();
        
        const sendRequest = async ():Promise<void> => {
          try {
            const res = await api.post(postRequest,formData);
            const body= res.data;
            // console.log(body);
            setContactMsg({loaded:true,msg:"We will contact you ASAP by email: ",data:{fullName:body.fullName,email:body.email,content:body.content,cell:cell}});
            setSent(true)
            
            setTimeout(()=>{
              setContactMsg({loaded:false,data:{fullName:"",content:"",email:"",cell:""},msg:""});
              setFullName(null);
              setEmail(null);
              setContent(null);
              setCell("")
              setFormData(null);
            },8000);

          } catch (error) {
            console.error((AxiosError:any)=> AxiosError.message);
          }
          
        };
        if(formData){
        sendRequest();
        }
    }

  return (
    <Stack direction="column" sx={{alignItems:"center",margin:"1rem auto"}}>
        <ChatWithUs contactMsg={contactMsg}/>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FullNameInput setFullName={setFullName} formData={formData} sent={sent} />
      <EmailInput setEmail={setEmail} formData={formData} sent={sent}/>
      <CellInput setCell={setCell} cell={cell} sent={sent}/>
      <ContentInput setContent={setContent} cell={cell} formData={formData} sent={sent} content={content} />
      <Stack direction="column" spacing={2} sx={{ margin: "2rem auto" }}>
        
        <Fab
          color="secondary"
          size="small"
          variant="extended"
          onClick={(e) => handleSubmit(e)}
          className={formData ? styles.write : styles.writeHide}
        >
          
          <h3 >
            submit
          </h3>
        </Fab>
        
      </Stack>
    </form>
    </Stack>
  );
};

export default RequestForm;
