
import {navLinkGames,navLinkUltils,navLinkExtras,navLinkHome} from '@component/context/ExportNavLinks';
import ChangeEvent from 'react';

export type navType={
    name:string,
    link:string
}
export type promiseType={
    url:string,
    lastModified:Date,
    changefreq:string,
    priority:number
}
export async function genArr():Promise<promiseType[]>{
    const site=(process.env.NODE_ENV==='production') ? process.env.NEXT_PUBLIC_site :"http://localhost:3000";
    let arr:promiseType[]=[];
    navLinkGames.forEach((obj)=>{
        arr.push({url:`${site}${obj.link}`,lastModified: new Date(),changefreq:"daily",priority:1});
    });
    navLinkUltils.forEach((obj)=>{
        arr.push({url:`${site}${obj.link}`,lastModified: new Date(),changefreq:"daily",priority:1})
    });
    navLinkExtras.forEach((obj)=>{
        arr.push({url:`${site}${obj.link}`,lastModified: new Date(),changefreq:"daily",priority:1})
    });
    navLinkHome.forEach((obj)=>{
        if(!obj.link.startsWith("https")){
        arr.push({url:`${site}${obj.link}`,lastModified: new Date(),changefreq:"daily",priority:1})
        }
    });
   
   return arr
    
    
}