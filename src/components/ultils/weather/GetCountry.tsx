"use client";
import React from 'react';
import location from './getLocation.json';
import {InputLabel} from "@mui/material";

type locationObjType={
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
type getCoType={
    setLatLong:React.Dispatch<React.SetStateAction<string |null>>,
    latLong:string |null
}

async function getLocFunc(location:any[] | any):Promise<locationType>{
    let locs:locationType=[]
    if(location.length>0){
        location.forEach((loc:locationObjType)=>{
            locs.push({country:loc.country,name:loc.name,lat:loc.lat,lng:loc.lng})
        });
    }
    return locs;
}

const GetCountry = ({setLatLong,latLong}:getCoType) => {
    const [getLocation,setGetLocation]=React.useState<locationType |[] >([]);
    const [countryString,setCountryString]=React.useState<string | undefined>("");


    React.useMemo(async()=>{
        let temp=await getLocFunc(location)
        const loc:locationType=temp;
        setGetLocation(loc)
    },[setGetLocation]);

  return (
    <div className="container mx-auto flex flex-col justify-start items-center bg-white text-black dark:bg-white dark:text-black my-2 p-2 rounded-lg">
            
                <InputLabel shrink={true} htmlFor={"latLonCity"}>Select City</InputLabel>
                <select
                    name="latLonCity"
                    id="latLonCity"
                    value={latLong ? latLong :"city"}
                    placeholder={"select country"}
                    onChange={(e)=>setLatLong(e.target.value)}
                    >
                        {getLocation ? getLocation.map((latlon,index)=>(
                            <option value={`${latlon.lat},${latlon.lng}`}
                             key={`${latlon.lat}-${index}`}>{latlon.name}
                             </option>
                        ))
                        :
                        <div><h4>loading locations...</h4></div>
                    }
                </select>
            
    </div>
  )
}

export default GetCountry