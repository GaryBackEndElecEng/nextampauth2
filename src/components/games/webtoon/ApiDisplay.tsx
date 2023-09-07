"use client";
import React from 'react'
import Image from 'next/image';

type objType={
obj:{
  name:string,
  index:number,
  iconImage:string,
  code:string
    },
query:string
}
const ApiDisplay = ({obj,query}:objType) => {
  const webToonDisplayRef=React.useRef(null);
  const [show,setShow]=React.useState<boolean>(false);

  React.useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      let entry=entries[0];
      setShow(entry.isIntersecting);
    },{threshold:0.7});
    if(webToonDisplayRef.current){
      observer.observe(webToonDisplayRef.current);
    }

  },[]);
  return (
    <div  className="container mx-auto dark:bg-black dark:text-white bg-white text-black" >
        <div className={ show ? "webtoonDisplay flexCol rounded-lg my-2 shadow-md shadow-indigo-500 flex-wrap gap-1 relative" :
          "webtoonDisplay flexCol py-1 rounded-lg my-2 shadow-md shadow-indigo-500 flex-wrap gap-1 relative"
      }
        ref={webToonDisplayRef}
        >
            <h4 className="m-auto">{query}</h4>
            <h5 className="mx-auto py-2">{obj.code}</h5>
            <Image src={obj.iconImage} alt="www.masterconnect.ca" className="m-auto" height={100} width={100} style={{background:"yellow",color:"white"}} />
        </div>
    </div>
  )
}

export default ApiDisplay