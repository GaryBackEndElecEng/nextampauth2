

import {navImageLinkType} from "@context/Types";
import {allNavLinks} from "@context/navList";
import { MetadataRoute } from 'next';
import ChangeEvent from 'react';

export type navType={
    name:string,
    link:string
}
export type promiseType={
    url:string,
    lastModified:Date,
    changeFrequency:string,
    priority:number
}
export async function genArr():Promise<MetadataRoute.Sitemap>{
    const site=(process.env.NODE_ENV==='production') ? "https://www.masterultils.com" :"http://localhost:3000";
    let arr:MetadataRoute.Sitemap=[];
    allNavLinks.forEach((obj)=>{
        arr.push({url:`${site}${obj.link}`,lastModified: new Date(),changeFrequency:"always",priority:1});
    });

   return arr
    
    
}