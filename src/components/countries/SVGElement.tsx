
import React from 'react';
import { ReactSVG } from 'react-svg';
import StylesSvg from "./country.module.css";
import Image from 'next/image';
import { Blob } from 'buffer';
// import {middleware} from '@component/middleware/middleware';

type SVGType = {
    name: string | null,
    title: string,
}
const getSVG=async(name:string | null)=>{
    const url="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/svg";

    const src: string = `${url}/${name?.toLowerCase()}.svg`;
    // const src: string = `http://localhost:3000/svg/${name?.toLowerCase()}.svg`;
  
    try {
        const res=await fetch(src);
        const body= await res.blob();
        // console.log(JSON.stringify(body),name?.toLowerCase())
        return URL.createObjectURL(body)
        
    } catch (error) {
        console.error(new Error("did not get the blob"))
    }
}
const SVGElement = ({ name, title }: SVGType) => {
    // const src: string = `http://localhost:3000/svg/${name}.svg`
    const url="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/svg"
    const src: string = `${url}/${name}.svg`
    const styles ={
          height: 300,
          width: 200,
      }
    return (
        <ReactSVG
            desc={`www.masterconnect.ca SVG import for ${title} Icon`}
            src={src}
            title={title}
            httpRequestWithCredentials={false}
            useRequestCache={true}
            afterInjection={(svg) => {
                svg.style.width="300px";
                // svg.style.transform="scale(0.5)"
                }}
        />
    )
}

export default SVGElement

export const SVGImage= ({name,title}:SVGType)=>{
    const [getBlob,setGetBlob]=React.useState<any>(null);
    React.useMemo(async ()=>{
        let getThis = await getSVG(name);
        if(getThis){
            setGetBlob(getThis)
        }
    },[name]);

    const src: string = getBlob;

    
    return(
        <img src={src} className="aspect-video w-[300px]" alt={title}/>
    )
    
}

export const RegularSVG=({name,title}:SVGType)=>{
    const url="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/svg"
    const src: string = `${url}/${name?.toLowerCase()}.svg`
    return(
        <svg width="275" height="190" className="m-auto">       
            <image xlinkHref={src} width="300" height="200"/>    
        </svg>
    )
}



