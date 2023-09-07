"use client";
import React,{MouseEvent} from 'react';
import {searchCity} from './countryCode'


type locObjType={
  country: string,
  name: string,
  lat: string,
  lng: string
}
type locationType={
  country: string,
  name: string,
  lat: string,
  lng: string
}[]
type setSelectLatLongType={
  obj:locObjType,
  setLatLong:React.Dispatch<React.SetStateAction<string | null>>,
  setCity:React.Dispatch<React.SetStateAction<string>>,
  countryCode:string | null,
  
}
const CityButton = ({obj,setLatLong,countryCode,setCity}:setSelectLatLongType) => {
  const buttonCityRef=React.useRef(null);
  const [butt,setButt]=React.useState<boolean>(false)

  React.useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
        let entry=entries[0];
        setButt(entry.isIntersecting);
    },{threshold:1});

    if(buttonCityRef.current){
    observer.observe(buttonCityRef.current);
    }
},[]);

  const handleCitySelect=(e:MouseEvent<HTMLButtonElement> | undefined,obj:locObjType)=>{
    e?.preventDefault();
    // console.log("clicked city",obj)
    if(obj && countryCode){
        setLatLong(`${obj.lat},${obj.lng}`)
        searchCity(obj.name,countryCode)
        setCity(obj.name)
    }
}
// console.log("butt",butt)
  return (
    <button 
    ref={buttonCityRef}
      className={ butt? " cursor-pointer border border-teal rounded-lg shadow-lg shadow-teal-600 px-2 shadow-lg shadow-teal-500 transition-all ease-in-out transform scale(1.1) bg-blue text-white"
      :
      " cursor-pointer border border-teal rounded-md shadow-md shadow-stone-500 px-0 transform scale(1) transition-all ease-in-out bg-blue text-white"
      } 
        onClick={(e)=>handleCitySelect(e,obj)}
      >
          {obj.name}
    </button>
  )
}

export default CityButton