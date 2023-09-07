import React from "react";
import styles from "./contact.module.css";
import { Input, InputLabel, FormControl,TextareaAutosize,FormHelperText } from "@mui/material";

type formType={
  fullName:string |null,
  cell:string |undefined,
  email:string |null,
  content:string | null
}

type contentType={
  setContent:React.Dispatch<React.SetStateAction<string | null>>,
  cell:string | undefined,
  formData:formType | null,
  sent:boolean,
  content:string | null
}
const ContentInput = ({setContent,cell,formData,sent,content}:contentType) => {
  const [tempContent,setTempContent]=React.useState<string>("");
  const [msg,setMsg]=React.useState<{loaded:boolean,msg:string }>({loaded:false,msg:"enter your request"});

  React.useEffect(()=>{
    const content_REGEX=/(^[A-Za-z]{2,16})([ ]{0,1})([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})?([ ]{0,1})?([A-Za-z]{2,16})/;
    if(content_REGEX.test(tempContent) ){
      if(cell && tempContent){
      setContent( `cell ${cell} \n content: ${tempContent}`);
      }
      setMsg( {loaded:true,msg:" thank you "})
    }
  },[tempContent,setContent,cell,sent]);
  
  React.useEffect(()=>{
    if(formData && sent && content){
      setTempContent("");
      setMsg({loaded:false,msg:""});
    }
  },[formData,sent,content,setContent]);

  return (
    <div className={styles.contentInput}>
    <FormControl size="medium" variant="filled"  style={{margin:"0.5rem auto",}}
    className="bg-white text-black dark:bg-white dark:text-black my-2 p-2 rounded-lg"
    >
      <h3
        className="bg-white text-blue dark:bg-white dark:text-blue font-bold my-2 p-2 rounded-lg"
      >
        Message
      </h3>
      <TextareaAutosize
        aria-label="maximum height"
        minRows={4}
        value={tempContent}
        onChange={(e) => setTempContent(e.target.value)}
        required={true}
        style={{ boxShadow: "1px 1px 3px 1px black",background:"white",minWidth:"300px",width:"100%" }}
      />
      {msg.loaded ? 
      <FormHelperText 
      className="text-center rounded-lg bg-white text-black dark:bg-black dark:text-white my-2 p-2 rounded-lg"
      >{msg.msg}
      </FormHelperText>
      :
      <FormHelperText sx={{backgroundColor:"white",color:"blue"}}
      className="text-center"
      >{msg.msg}
      </FormHelperText>
      }
    </FormControl>
    </div>
  );
};

export default ContentInput;