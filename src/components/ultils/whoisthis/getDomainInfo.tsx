import React from 'react';



export type ownerType={
  handle?:string ,
  type?:string |null ,
  name?:string ,
  organization?:string ,
  email?: string,
  address?:string[] | string ,
  zipcode?:string ,
  city?:string ,
  state?:string ,
  country?:string ,
  phone?:string ,
  fax?:string ,
  created?:string |null ,
  changed?:string |null 
}

export type contactType={
  handle?:string ,
  type?:string | null ,
  name?:string ,
  organization?:string ,
  email?: string,
  address?:string ,
  zipcode?:string ,
  city?:string ,
  state?:string ,
  country?:string ,
  phone?:string ,
  fax?:string ,
  created?:string ,
  changed?:string,
  
}[] 
export type contactType2={
  owner:ownerType[],
  admin:ownerType[],
  tech:ownerType[],
} 
type registrarType={
  id?: string,
  name?: string,
  email?: string | null,
  url?: string | null,
  phone?: string |null
}

export type whoDomainType={
  server?:string,
  type?:string |null,
  name?:string |null,
  idnName?:string | null,
  status?:any,
  nameserver?:string[],
  ips?:string[] | null | string,
  created?:string,
  changed?:string,
  expires?:string | null,
  registered?:boolean,
  dnssec?:string | boolean,
  contacts?:contactType ,
   whoisserver?:string,
  registrar?:registrarType,
  rawdata?:string[],
  network?:string | null,
  exception?:string | null,
  parsedContacts?:boolean,
  ask_whois?: string
}
export type whoDomainType2={
  server?:string,
  name:string |null,
  idnName:string | null,
  status?:string[],
  nameserver?:string[],
  ips?:string[] | null | string,
  created?:string,
  changed?:string,
  expires?:string | null,
  registered?:boolean,
  dnssec?:string | boolean,
  contacts?:contactType2 ,
   whoisserver?:string,
  registrar?:registrarType,
  rawdata?:string[],
  network?:string | null,
  exception?:string | null,
  parsedContacts?:boolean,
  ask_whois?: string
}

const getDomainInfo = async(domain:string):Promise<any | undefined> => {

    const url = `https://zozor54-whois-lookup-v1.p.rapidapi.com/?domain=${domain}&format=json&_forceRefresh=0`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '512e19eb3cmsh0b9bf8c65edd50ep11ae4bjsn9a01883aacf8',
        'X-RapidAPI-Host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const body:whoDomainType = JSON.parse(result)
        const body2:whoDomainType2 = JSON.parse(result)
        // console.log("body",body)
        if(body?.contacts && body?.contacts.length>0){
          return body
        }else{
          return body2
        }
        
    } catch (error) {
      if(error){
        console.error(error);
      }else{ console.error(new Error(" did not recieve data"))}
    }
}

export default getDomainInfo