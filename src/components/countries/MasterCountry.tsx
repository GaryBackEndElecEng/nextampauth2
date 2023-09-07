"use client";
import React, { MouseEvent } from 'react';
import classNames, { Countries } from "world-countries";
import Link from 'next/link';
import SVGElement,{SVGImage,RegularSVG} from "./SVGElement";
import {FormControl,Input,FormHelperText} from "@mui/material";

// import Router from 'next/router';




const MasterCountry = () => {
    const [countries, setCountries] = React.useState<Countries | null>(null);
    const [search,setSearch]=React.useState<string >("");

    React.useEffect(()=>{
        if(window.scrollY){
            window.scroll(0,0);
        }
    },[]);
    
    React.useEffect(() => {
        if (!countries) {
            setCountries(classNames);
        }
    }, [search,countries]);

    React.useMemo(() => {
        if (countries && search) {
            const searchCountry=countries.filter((obj,index)=>(obj.name.common.toLowerCase().includes(search?.toLowerCase())));
            setCountries(searchCountry);
        }else{
            setCountries(classNames);
        }
    }, [search]);


    return (
        <div className="lg:mx-auto lg:container p-3  ">
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-center text-2xl my-2 text-black dark:text-white">Search a country</h3>
                <FormControl className="text-black bg-white dark:text-black m-auto dark:bg-white shadow-lg dark:shadow-white shadow-blue rounded-lg">
            <Input
            name={"search"}
            value={search ? search : ""}
            onChange={(e)=>setSearch(e.target.value)}
            className="text-black"
            />
                </FormControl>
                <FormHelperText className="dark:text-white text-black text-xl my-2">find a country</FormHelperText>
            </div>
            <div className="m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3 bg-[whitesmoke] dark:bg-black text-black dark:text-white">
                {
                    countries ? countries.map((country, index) => (
                        <div className="col-span-1 w-[300] m-auto" key={`${country.name.official}-${index}`}>
                            <h3 className="text-xl text-center my-2">Find a country</h3>
                            <h3 className="text-3xl text-center my-2 font-bold"> {country.name.official}</h3>
                            <div className="w-[300] m-auto  relative">
                            <RegularSVG name={country.cca3} title={country.name.common}/>
                            </div>
                            <h3 className="text-lg text-center">region: {country.region}</h3>
                            <h3 className="text-lg text-center">subregion: {country.subregion}</h3>
                            <div className="flex flex-col m-auto items-center justify-center rounded-lg px-3 p-1 my-2 border shadow-md shadow-site_blue_grey hover:shadow-blue hover:tracking-widest"
                            
                            >
                                <Link href={`/ultils/countries/detail?name=${country.name.official.toLowerCase()}`}>
                                <h4 className="text-lg m-auto">details</h4>
                                </Link>
                            </div>
                        </div>
                    ))
                        :
                        <div className="col-span-none flex flex-col items-center justify-center">
                            <h3 className="text-xl">loading...</h3>
                        </div>
                }

            </div>


        </div>
    )
}

export default MasterCountry