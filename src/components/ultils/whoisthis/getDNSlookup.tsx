
// import {headers} from 'next/headers';
// export function getRemainder(){
//   const headerList=headers();
//   const remaining=headerList.get("x-ratelimit-requests-remaining");
//   return remaining
// }

type SOAType={
  expire: number,
  hostmaster: string,
  minttl:number,
  nsname: string,
  refresh: number,
  retry: number,
  serial: number
}
type exchangeType={
  exchange: string,
  priority: number
}
export type dnslookupType={
  message?:string,
  A?:string[],
  MX?:exchangeType[],
  NS?:string[],
  SOA?:SOAType,
  TXT?:string[]
}


const getDNSlookup =async (dnslookup:string):Promise<dnslookupType | undefined> => {

  const url = `https://zozor54-whois-lookup-v1.p.rapidapi.com/nslookup?domain=${dnslookup}`;
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
        const body=JSON.parse(result);
          const body2:dnslookupType=body
          console.log(body2)
          if(body2 && body2 !==undefined){
            console.log(body2)
          return body2;
          }
          
        
    } catch (error) {
        if(error){
        console.error(error);
        }else{console.error(new Error("It did not GET"))}
    }
}

export default getDNSlookup