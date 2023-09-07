"use client";
import React from 'react';
import { whoDomainType,whoDomainType2 } from './getDomainInfo';
import DomainOwnerAdmin from "@/components/ultils/whoisthis/DomainOwnerAdmin";
import RawData from './RawData';
const whoDomtype={} as whoDomainType;
type mainResultsType={
    getResults:whoDomainType | whoDomainType2 | null | undefined,
}

function narrowLine(sent:string,num:number):string{
  let len:number=sent.length;
  const sentArr:string[]=sent.split("");
  let tempStr:string="";
  if(len > num){
    sentArr.splice(len-1,0,"\n");
  }
  tempStr=sentArr.join("");
  return tempStr
}
const DomainDetail = ({getResults}:mainResultsType) => {
  const [status,setStatus]=React.useState<string[]|null>(null);
  const [statusStr,setStatusStr]=React.useState<string|null>(null);
  React.useEffect(()=>{
    if(getResults?.status?.length && typeof(getResults.status)!=="string"){
      setStatus(getResults.status);
      // console.log(getResults.status);
    }else if(getResults?.status){
      // console.log(getResults.status);
      setStatusStr(JSON.stringify(getResults?.status))
    }
  },[getResults]);
 
  return (
    <div className="flex flex-col mx-auto mx-2 justify-center items-center flex-wrap my-2 shadow-lg shadow-blue rounded-lg p-2  ">
      {(getResults && !(whoDomtype===getResults)) &&
        <div className="m-auto flex flex-col   items-center gap-2">
          <h3 className="text-md m-auto">server:{getResults.server && getResults.server}</h3>
          {getResults.name &&
           <h3 className="text-md m-auto">name:{getResults.name }</h3>
          }
          {getResults.idnName &&
           <h3 className="text-md m-auto">Id name:{getResults.idnName}</h3>
          }
          {getResults.ips &&
           <h3 className="text-md m-auto">ips:{getResults.ips}</h3>
          }
          {getResults.created &&
           <h3 className="text-md m-auto">created:{getResults.created}</h3>
          }
          {getResults.changed &&
           <h3 className="text-md m-auto">changed:{getResults.changed}</h3>
          }
          {getResults.expires &&
           <h3 className="text-md m-auto">expires:{getResults.expires}</h3>
          }
          {getResults.registered &&
           <h3 className="text-md m-auto">registered:true</h3>
          }
          {getResults.dnssec &&
           <h3 className="text-md m-auto">
            dnssec:
           {(typeof(getResults.dnssec) !=="boolean") && narrowLine(getResults.dnssec,30)}
           {(typeof(getResults.dnssec) ==="boolean") && getResults.dnssec.toString()}
           </h3>
          }
          {getResults.network &&
           <h3 className="text-md m-auto">network:{getResults.network}</h3>
          }
          {getResults.exception &&
           <h3 className="text-md m-auto">exception:{getResults.exception.slice(0,20)}</h3>
          }
          {getResults.parsedContacts &&
           <h3 className="text-md m-auto">parsedContacts:true</h3>
          }
          <div className="flex flex-col justify-center items-center px-2 mx-auto">
            <small className="text-xs mx-auto px-7 flex flex-col">
                <div className="font-bold">nameservers:</div>
              {
              (getResults.nameserver && getResults.nameserver?.length > 0) &&

               getResults.nameserver?.map((nameserver, index) => (
                <small key={index}>
                  <small className="text-xs mx-auto px-3" key={index}>
                    {narrowLine(nameserver,35)},
                  </small>
                  </small>
                  ))
              }
            </small>
            <small className="text-xs mx-0">
                <div className="font-bold">servers status:</div>
              {
              (status)
               ? 
                ( status.map((status,index)=>(
                  <small className="text-xs m-auto" key={`${index}-${status}`}>
                    <div>{status.split(" ")[0]}</div>
                    <div>{status.split(" ")[1]}</div>
                  </small>
                  ))
                )
                :
                <small >
                  <small className="text-xs m-auto">
                    {statusStr && statusStr}
                  </small>
                </small>
              
              }
            </small>
            <small className="text-xs m-auto">
            <div className="m-auto my-2 px-auto ">
                 <div className="my-2 px-auto font-bold">
                  contacts:owner
                 </div>
              {(getResults && getResults.contacts) &&
               <DomainOwnerAdmin contact={getResults.contacts}/>
              }
              </div>
            
            </small>
          </div>
          <div className="flex flex-col justify-center items-start p2 m-2">
            {(getResults.rawdata) &&
            getResults.rawdata?.map((dump,index)=>(
                <div className="m-auto px-4" key={`${index}-dump`}>
                    <RawData dump={dump}/>
                </div>
            ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default DomainDetail