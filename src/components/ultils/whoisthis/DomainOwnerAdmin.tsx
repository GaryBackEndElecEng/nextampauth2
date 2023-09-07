"use client";
import React from 'react';
import {contactType,contactType2} from "@/components/ultils/whoisthis/getDomainInfo";
import DomainContGen from "./DomainContGen";

type mainOwnerType={
contact?:any
}


const DomainOwnerAdmin = ({contact}:mainOwnerType) => {
    const [getContact,setGetContact]=React.useState<contactType |undefined>([]);
    const [getContact2,setGetContact2]=React.useState<contactType2 | undefined>();
    const [getOwnerObj,setGetOwnerObj]=React.useState<string | undefined>();
    const contType={} as contactType;
    const contType2={} as contactType2;
    
    const isArray=(contact && contact.length>0)? true : false;
    const isUserArray=(contact && (contact.owner))? true : false;
    console.log("isArray",isArray,"isUserArray",isUserArray)
    
    React.useEffect(()=>{
      
        if(isArray && !isUserArray){
          let tempCont:contactType | undefined=contact
            setGetContact(contact && contact);
        }else if(isUserArray){
          let tempCont:contactType2 | undefined=contact
          setGetContact2(contact && contact);
        }else{
          let testThis=contact ? JSON.stringify(contact):undefined;
          
            setGetOwnerObj(testThis)
        }
    },[isArray,setGetContact,setGetOwnerObj,contact,isUserArray]);

  return (
    <div>
        {(getContact && isArray) &&
            getContact.map((owner, index) => (
                <div className="flex flex-col" key={index}>
                  <DomainContGen generic={owner}/>
                </div>
              ))
        }
        {(getContact2 && isUserArray) &&
            getContact2.owner.map((owner, index) => (
                <div className="flex flex-col" key={index}>
                  <DomainContGen generic={owner}/>
                </div>
              ))
        }
        {!(isArray && isUserArray ) &&
          <small className="flex flex-col w-3/4 flex-wrap gap-2 whitespace-break-spaces">
          {getOwnerObj}
        </small>
        }
    </div>
  )
}

export default DomainOwnerAdmin