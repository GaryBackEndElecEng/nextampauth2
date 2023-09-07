import { ObjectType } from "typescript"
// import { ElementHandle } from "puppeteer";

export type headersType={
upgrade_insecure_requests:string,
user_agent:string,

}

export type getAttribType={
    attr:string,
    text:string | null,
    
  }
// export type hType={
//     h1:ElementHandle[],
//     h2:ElementHandle[],
//     h3:ElementHandle[],
// }
export type returnHtmlType={
    id:number ,
    el:string,
    text:string |null
}
export type itemType={
    id:number,
    title:string,
    price:string,
    image:string,
    href:string
}
export type itemWebType={
    id:number,
    title?:string,
    price?:string,
    image?:string,
    href?:string,
    desc?:string,
    name?:string,
    headers?:ObjectType,
    email?:string,
}
export type scraperType={
    urls:string[],
    name:boolean,
    title:boolean,
    price:boolean,
    href:boolean,
    desc:boolean,
    image:boolean,
    headers:boolean,
    email:boolean,
  }

 export type jsonArrType={
    items:itemType[]
}
 export type jsonWebArrType={
    items:returnHtmlType[]
}