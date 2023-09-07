"use client";
import React from 'react'
import { Grid, Container,} from '@mui/material';
import styles from "./contact.module.css";
import {GeneralContextNoAcc} from "@context/GeneralContext";
// import {categoryGeneralInfo} from "@context/Types";

  type mediaLinkType={
    name:string,
    link:string
  }
const GetGenInfo = () => {
    const {generalInfo}=React.useContext(GeneralContextNoAcc);
  const [mediaLink,setMediaLink]=React.useState<mediaLinkType[]>([]);

  React.useMemo(() => {
    
    if(generalInfo){
      let arr:mediaLinkType[]=[];
      generalInfo.siteArray.forEach((media,index)=>{
        switch(media.split("::")[0]){
          case "fb":
            arr.push({name:"FB",link:media.split("::")[1].trim()});
            break;
          case "linkedin":
            arr.push({name:"linkedlin",link:media.split("::")[1].trim()})
            break;
          case "github":
            arr.push({name:"github",link:media.split("::")[1].trim()});
            break;
          case "instagram":
            arr.push({name:"instagram",link:media.split("::")[1].trim()});
            break;
          case "masterconnect":
            arr.push({name:"www.masterconnect.ca",link:media.split("::")[1].trim()});
            break;
            default:
                return;
        }
       
      });
      setMediaLink(arr);
    }
  }, [generalInfo]);

  return (
    <Container maxWidth="md">
        {generalInfo ?
          <div className="mx-0 my-auto flex flex-col justify-start shadow-xl shadow-blue p-3 rounded-lg">

            <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="cols-spans-1 shadow-md p-2 ">
                <h4 className={`text-2xl my-2 mx-0 ${styles.fontStyleCt2}`}
                style={{backgroundImage:"var(--background-contact)"}}
                >
                  We are located at:
                </h4>
              <div className=" flex flex-row flex-wrap gap-1 justify-center items-center ">
                
                <h6>{generalInfo.address}</h6>
                <h6>,{generalInfo.city}</h6>
                <h6>,{generalInfo.country}</h6>
                <h6>,PO:{generalInfo.postal}</h6>
                </div>
              </div>
              <ul className="cols-spans-1 flex flex-col justify-center items-center shadow-md w-full">
                <h6 className="text-2xl font-bold my-2">Join Us!:</h6>
                <div className="h-[4px] w-full " style={{background:"var(--background-contact)"}}/>
                {mediaLink.map((media,index)=>(
                  <li className="text-md hover:text-blue hover:shadow-md transition-all" key={index}>
                    <a href={media.link} className="mx-auto my-1 cursor-pointer px-2 hover:tracking-widest">{media.name}</a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
      :
      <div className="mx-0 my-auto flex flex-col justify-start shadow-xl shadow-blue p-3 rounded-lg">
        <h3 className="text-center">Loading.....</h3>
        </div>
      }
    </Container>
  )
}

export default GetGenInfo