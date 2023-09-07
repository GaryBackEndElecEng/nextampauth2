" use client";
import React,{MouseEvent} from 'react';
import {searchCountry} from './countryCode'


type objectType={
    obj:{
    name:string,
    code:string
    }
  }
  type objType={
    name:string,
    code:string
    }
    type setSelectLatLongType={
        obj:objType,
        setSelectedCo:React.Dispatch<React.SetStateAction<string | null>>,
        setCountryCode:React.Dispatch<React.SetStateAction<string | null>>,
        setCountryHide:React.Dispatch<React.SetStateAction<boolean>>
    }
const CountryButton = ({obj,setCountryCode,setSelectedCo,setCountryHide}:setSelectLatLongType) => {
    const buttonRef=React.useRef(null);
    const [butt,setButt]=React.useState<boolean>(false);
    const buttChange:string= butt ? "bg-red":"bg-blue";

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            setButt(entry.isIntersecting);
        },{threshold:1});

        if(buttonRef.current){
        observer.observe(buttonRef.current);
        }
    },[]);

    const handleCoSelect=(event:MouseEvent<HTMLButtonElement> | undefined,obj:objType):void=>{
        event?.preventDefault();
        if(obj){
            setCountryCode(obj.code)
            searchCountry(obj.name)
            setSelectedCo(obj.name)
            setCountryHide(true)
        }
    }
  return (
    <button 
    className={butt ? "countryList cursor-pointer border border-indigo rounded-lg shadow-md shadow-indigo-600 px-2 opacity-100 bg-blue text-white"
    :
    "cursor-pointer border border-teal rounded-lg shadow-md shadow-teal-600 px-0 opacity-50 bg-red text-white"
}
        onClick={(event:MouseEvent<HTMLButtonElement> | undefined)=>handleCoSelect(event,obj)}
        ref={buttonRef}

    >
        {obj.name}
    </button>
  )
}

export default CountryButton