"use client";
import countriesArr from "./country.json";
import React,{MouseEvent,ChangeEvent} from 'react';
import {FormControl,Input} from "@mui/material";
import GenCountries from "./GenCountries";
import {UltilsContext} from "@context/GeneralContext";
import {countryType} from "@context/Types";
import FilterCountry from "./FilterCountry";




const COCurrency = () => {
    const[country,setCountry]=React.useState<string | null>(null);
    const {getCountries}=React.useContext(UltilsContext);
    const [filterCo,setFilterCo]=React.useState<countryType[] | undefined>([]);
    const [ show,setShow]=React.useState<boolean>(false);

    function findCountry(co:string):void{
        if(country){
        let temp:countryType[] | undefined=getCountries?.filter((co)=>(co.countryName.toLowerCase().includes(country.toLowerCase())));
        setFilterCo(temp);
        }
        }
        

    const handleFindCountry=(e:MouseEvent)=>{
        e.preventDefault();
        if(country)
        findCountry(country);
        setShow(true)
    }

    return (
        <div className="lg:mx-auto text-black bg-[whitesmoke] dark:text-white dark:bg-black">
            <div className="lg:mx-auto lg:container flex flex-col items-center justify-center w-full ">
                <h3 className="text-center text-3xl font-bold">countries with currency</h3>
                <FormControl className="text-blue bg-white dark:bg-black dark:text-white mx-auto my-2">
                    <h3 className="text-xl text-center my-1">search</h3>
                    <Input
                    name="search"
                    value={country ? country : ""}
                    onChange={(e)=>setCountry(e.target.value)}
                    style={{background:"white",color:"black"}}
                    />
                <div className="flex flex-col items-center justify-center">
                    <button className="text-center p-1 px-2 text-blue bg-black rounded-lg" onClick={(e)=>handleFindCountry(e)}>find</button>
                </div>
                
                </FormControl>
                {show && <div className="relative w-full mx-0">
                    <FilterCountry show={show} setShow={setShow} filterCo={filterCo}/>
                </div>}
                <GenCountries/>
              
            </div>
        </div>
    )
}

export default COCurrency
