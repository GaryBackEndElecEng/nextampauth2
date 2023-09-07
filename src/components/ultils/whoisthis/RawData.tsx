"use client";
import React from 'react'

type mainRawdataTYpe={
    dump:string
}
const RawData = ({dump}:mainRawdataTYpe) => {
    const [sentence,setSentence]=React.useState<string[] | null>(null);
    const [getWidth,setGetWidth]=React.useState<number>(0);

    React.useEffect(()=>{
        setGetWidth(window.innerWidth);
        let width:number=window.innerWidth;
        const isWidth= width <900 ? true : false;
        if(dump){
            let arr:string[]=[];
            let splitPhrase:string[]=dump.split("\n");
            splitPhrase.forEach((sent)=>{
                let len:number=sent.length;
                if(isWidth && len > 40){
                    let sentArr:string[]=sent.split("").splice(len-1,0,"\n");
                    let tempStr:string=sentArr.join("");
                    arr.push(tempStr);
                }else{
                    let tempStr:string=sent;
                    arr.push(tempStr);
                }
            });
            setSentence(arr);
        }
    },[dump]);

  return (
    <div className="mx-auto my-2 overflow-x-hidden px-2">
        {sentence && 
            sentence.map((sent,index)=>(
                <div className="m-auto" key={`${index}-dump`}>
                    {sent}
                </div>
            ))
        }
    </div>
  )
}

export default RawData