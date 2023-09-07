import React,{MouseEvent} from 'react';
import {countryCodes} from "../weather/countryCode";
import {filterFunc} from './filterFunc';

type typeCurrType = { ky: string, val: string }
type countryItemType={
    name: string;
    code: string;
}
type getWordsType={
    first:string ,
    second:string 
}
type countryCodeType={
        name: string;
        code: string;
}[]
type inputType={
    selectCurrency: string | undefined,
    countryCode:countryItemType | null,
    setCountryCode:React.Dispatch<React.SetStateAction<countryItemType | null>>,
    currItem:typeCurrType |null
}
const Countries = ({selectCurrency,countryCode,setCountryCode,currItem}:inputType) => {
    const cutCurrItem:string |null=currItem ? currItem.val.split(" ")[0] : null;
    const getWords:getWordsType=currItem ? filterFunc(currItem.val):{first:"",second:""};

    React.useEffect(()=>{
        if(selectCurrency && getWords.first !==undefined){
        let getCountry:countryItemType={name:"",code:""};
        let getCountry2:countryItemType={name:"",code:""};
        const temp:countryCodeType=countryCodes.filter(obj=>(obj.name.toLowerCase().match(getWords.first)));
            if(temp && getWords.second !==""){
                const second=temp.filter(obj=>(obj.name.toLowerCase().includes(getWords.second)))[0]
                getCountry=temp[0]
                getCountry2=second
                setCountryCode(getCountry)
            }
            
        }
        
    },[selectCurrency,setCountryCode,currItem,getWords.first,getWords.second]);

console.log(countryCode)
  return (
    <div className="flex flex-col justify-center items-center p-1">

        {(countryCode ) ? 
        <div>
        <h4 className="mx-auto p-1 text-2xl my-2 text-pink-400 text-bold">country selection</h4>
        <h5 className="text-lg text-center text-indigo-500">name: {countryCode && countryCode.name}</h5>
        <h5 className="text-lg text-center text-indigo-500">country code: {countryCode && countryCode.code}</h5>
        
        </div>
        :
        <div>
        <h4 className="mx-auto p-1 text-2xl my-2 text-pink-400 text-bold">country selection</h4>
        <h5 className="text-lg text-center text-indigo-500">currency does not have a country</h5>
        
        
        </div>

    }
       
    </div>
  )
}

export default Countries