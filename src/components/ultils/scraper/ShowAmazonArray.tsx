import React,{MouseEvent} from 'react';
import {jsonArrType} from "./Scrapper";
import {itemType} from "./type";
import Image from "next/image";
// import {useRouter} from "next/router";


const ShowArray = ({items}:{items:itemType[]}) => {

  const handleopenLink=(e:MouseEvent,link:string)=>{
    e.preventDefault();
    if(!link.startsWith("https")){
    window.open(`https://www.amazon.com/${link}`,"blank");
    }
    else{
    window.open(link,"blank");
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 dark:text-white dark:bg-black text-black by-[whitesmoke]">
      <div className="text-lg text-center mx-auto container my-2 font-bold">
        item&#8217;s search
      </div>
        {items.length>0 ?
        items.map((item,index)=>(
            <div className="col-span-1 flex flex-col items-center shadow-lg rounded-lg p-2 shadow-blue " key={`${index}-${item.id}`}>
                <div className="text-md text-center my-2">{item.title}</div>
                <Image src={item.image} alt={"www.masterconnect.ca"} height={275} width={350}
                onClick={(e)=>handleopenLink(e,item.href)}
                />
                <div className="text-lg text-center my-2">price: ${item.price}</div>
                
            </div>
        ))
        
        :
        <div className="text-lg text-center grid grid-cols-3">
            <div>loading...</div>
        </div>
        }
        
    </div>
  )
}

export default ShowArray