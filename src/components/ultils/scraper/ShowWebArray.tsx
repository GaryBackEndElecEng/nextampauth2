import React,{MouseEvent} from 'react';
import {jsonWebArrType} from "./type";
import {returnHtmlType} from "./type";
import Image from "next/image";

// import {useRouter} from "next/router";

function clipText(text:string):string
{
  let arrReturn:string[]=[];
  let arr:string[]=text.split(" ");
  arr.forEach((word,index)=>{
    let lenWord=word.split("");
    if(lenWord.length>20 && lenWord.length <30){
      arrReturn.push(`${word}\n`);
    }else if(lenWord.length>20 && lenWord.length<40){
      let temWd1:string=lenWord.splice(0,20,"\n").slice(0,21).join("");
      let temWd2:string=lenWord.splice(0,22,"\n").slice(22,40).join("");
      arrReturn.push([temWd1+"\n",temWd2+"\n"].join(""));
    }else if(lenWord.length>40 && lenWord.length<70){
      let temWd1:string=lenWord.splice(0,20,"\n").slice(0,21).join("");
      let temWd2:string=lenWord.splice(0,22,"\n").slice(23,42).join("");
      let temWd3:string=lenWord.splice(0,43,"\n").slice(43,69).join("");
      arrReturn.push([temWd1+"\n",temWd2+"\n",temWd3+"\n"].join(""));
    }else if(lenWord.length>90){

      let temWd1:string=lenWord.slice(0,21).splice(0,20,"\n").join("");
      let temWd2:string=lenWord.slice(22,41).splice(21,40,"\n").join("");
      let temWd3:string=lenWord.slice(42,70).splice(41,70,"\n").join("");
      let temWd4:string=lenWord.slice(71,100).splice(71,100,"\n").join("");
      let temWd5:string=lenWord.slice(100,100).splice(1001,130,"\n").join("");
      arrReturn.push([temWd1+"\n",temWd2+"\n",temWd3+"\n",temWd4 +"\n",temWd5 + "\n"].join(""));
      
    }
    
  });
  return arrReturn.join("")
}
const ShowWebArray = ({items}:{items:returnHtmlType[]}) => 
{

    const openLink=(e:React.MouseEvent,link:string | null)=>
    {
      e.preventDefault();
      if((link && !link.includes("www.google.com")) && ( link.includes("http")))
      {
        console.log(link)
      window.open(link,"blank");
      }
    }
    
    
    const showHide=React.useCallback((text:string |null)=>{
      
      if(items.length>0 && items)
      {
        if(text){
          return {display:"block"}
        }else{
          return {display:"none"}
        }
      }
    },[items]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 dark:text-white dark:bg-black text-black by-[whitesmoke]">
      
        {items.length>0 ?
        items.map((item,index)=>(
            <div className=" flex flex-col items-center shadow-lg rounded-lg p-2 shadow-blue " key={`${index}-${item.id}`} style={showHide(item.text)} >
                <div className="text-lg text-center mx-auto container my-2 font-bold">
                            item&#8217;s search {item && item.text && clipText(item.text)}
                </div>
                { (item && item.el==="image" && item.text) &&
                <div className="m-auto flex flex-col items-center shadow-lg rounded-lg p-2 shadow-blue" >
                <div className="text-lg text-center my-2">type:{item.el}</div>
                <Image src={item.text} alt={"www.masterconnect.ca"} height={275} width={350}
                className="aspect-video m-auto"
                />
                </div>
                }
                {(item && item.el==="price" && item.text) &&
                <div className="text-lg text-center my-2">price: ${item.text}</div>
                }
                {(item && item.el==="Name" && item.text) &&
                <div className="text-lg text-center my-2">name:{item.text}</div>
                }
                {(item && item.el==="href" && item.text ) &&
                <div className="text-lg text-center my-2 flex flex-row flex-wrap justify-center items-center overflow-x-hidden cursor-pointer" onClick={(e)=>openLink(e,item.text)}>link:<span className="m-auto">{clipText(item.text)}</span></div>
                }
                {(item && item.el==="email" && item.text) &&
                <a href={`mailto:${item.text}`} className="text-lg text-center my-2 flex flex-row flex-wrap justify-center items-center overflow-x-hidden">{item.text}</a>
                }
                {(item && item.el==="desc" && item.text) &&
                <p  className="text-lg text-center my-2">{item.text}</p>
                }
                {(item && item.el==="title" && item.text) &&
                <p  className="text-lg text-center my-2">{item.text}</p>
                }
                {(item && item.el==="headers" && item.text) &&
                <p  className="text-lg text-center my-2">{clipText(item.text)}</p>
                }
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

export default ShowWebArray