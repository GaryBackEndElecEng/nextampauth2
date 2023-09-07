"use client";
import React, { MouseEvent } from 'react';
import classNames, { Countries, Country } from "world-countries";
import {CountryContext} from "@/components/context/GeneralContext";
import GenCurrCode from "@/components/countries/GenCurrCode";
import Translation from './Translation';
import Native from './Native';
import Languages from "./Languages";
import IddTel from './IddTel';
import SVGElement,{SVGImage,RegularSVG} from "./SVGElement";
import CountryCurr from "./CountryCurr";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { countrycurrType } from './types';
import Link from "next/link";



type slugType = {
  slug: { name: string | null }
}


const CountryItem = ({ name }: { name: string | null }) => {
  const [country, setCountry] = React.useState<Country | null>(null);
  const {show,setShow,showNative,setShowNative,setShowCurr,setShowDenom,showCurr,setShowLang,showLang}=React.useContext(CountryContext);
  

  React.useEffect(() => {
    if (!country && name) {
      let detailCo = classNames.filter((obj) => (obj.name.official.toLowerCase() === name))[0]
      setCountry(detailCo)
    }
  }, [name, country]);
  const handleTranslate = (e: MouseEvent) => {
    e.preventDefault();
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
  const handleNative = (e: MouseEvent) => {
    e.preventDefault();
    if (!showNative) {
      setShowNative(true);
    } else {
      setShowNative(false);
    }
  }
  const handleLang = (e: MouseEvent) => {
    e.preventDefault();
    if (!showLang) {
      setShowLang(true);
    } else {
      setShowLang(false);
    }
  }
  const handleCurr = (e: MouseEvent) => {
    e.preventDefault();
    if (!showCurr) {
      setShowCurr(true);
    } else {
      setShowCurr(false);
    }
  }
  


  return (
    <div className="lg:mx-auto lg:container min-h-[130vh] bg-[whitesmoke] text-black dark:bg-black dark:text-white p-3  ">
      {
        country ?
          <div className="m-auto flex flex-col items-center justify-center w-full mx-0">
            <h3 className="text-3xl text-center my-2 font-bold"> {country.name.official}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">region:</span> {country.region}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">subregion:</span> {country.subregion}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">Common:</span>{country.name.common}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">capital:</span> {country.capital}</h3>
            <div className="max-w-[300]  relative ">
            {/* <SVGElement name={country.cca3} title={country.name.common}/> */}
            <RegularSVG name={country.cca3} title={country.name.common}/>
            </div>
            
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">Flag:</span> {country.flag}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">status:</span> {country.status}</h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">area:</span> {country.area} km <sup>2</sup></h3>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">dial code:</span> Tel.Directory:</h3>
            <IddTel idd={country.idd}/>
            <h3 className="text-lg text-center"><span className="dark:text-white text-blue text-md">borders:</span> {country.borders.map((obj,index)=>(
            <span key={index}>{obj}, </span>
            ))}
            </h3>

            <h3 className="text-lg text-center">independence: {country.independent.toString()}</h3>
            <h3 className="text-lg text-center">LandLocked: {country.landlocked.toString()}</h3>
            <h3 className="text-lg text-center">LandLocked: {country.landlocked.toString()}</h3>
            
            <div className=" flex flex-col justify-start items-center">
              <h3 className="text-lg text-center font-bold my-2">lat, lng</h3>

              <div className=" font-bold">{country.latlng.map((num: number, index) => (
                <span key={index}>{num}, </span>
              ))}</div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center shadow-lg shadow-blue dark:shadow-white rounded-lg gap-2">
              <div className="col-span-1  w-full shadow-lg shadow-blue dark:shadow-white text-center ">
                <div className="flex inline-flex gap-2 justify-center items-center "

                >
                  <h3 className="text-lg m-auto font-bold my-2" >native</h3>
                  {
                    (showNative) ?
                      <IconButton
                        size="large"
                        onClick={(e) => handleNative(e)}
                        
                      >
                        <KeyboardDoubleArrowDownIcon sx={{ mx: 1, color: "blue" }} />
                      </IconButton>
                      :
                      <IconButton
                        size="large"
                        onClick={(e) => handleNative(e)}
                       
                      >
                        <KeyboardDoubleArrowUpIcon sx={{ mx: 1, color: "red" }} />
                      </IconButton>
                  }
                </div>
                {(showNative) &&

                  <Native

                    native={country.name.native}
                    showNative={showNative}
                  />
                }


              </div>
              
              <div className="col-span-1 w-full shadow-lg shadow-blue dark:shadow-white text-center relative">
                <div className="flex inline-flex gap-1 justify-center items-center "

                >
                  <h3 className="text-lg m-auto font-bold my-2" >languages</h3>
                  {
                    (showLang) ?
                      <IconButton
                        size="large"
                        onClick={(e) => handleLang(e)}
                        
                      >
                        <KeyboardDoubleArrowDownIcon sx={{ mx: 1, color: "blue" }} />
                      </IconButton>
                      :
                      <IconButton
                        size="large"
                        onClick={(e) => handleLang(e)}
                        
                      >
                        <KeyboardDoubleArrowUpIcon sx={{ mx: 1, color: "red" }} />
                      </IconButton>
                  }
                </div>
                {(showLang) &&

                  <Languages
                    lang={country.name.native}
                    showLang={showLang}
                  />
                }
              </div>
              <div className="span-col-1 w-full shadow-lg shadow-blue dark:shadow-white relative">
                <div className="flex flex-row gap-2 justify-center items-center">
                  <h3 className="text-lg text-center font-bold my-2" >translation</h3>
                  {
                    show ?
                      <IconButton
                        size="large"
                        onClick={(e) => handleTranslate(e)}
                      >
                        <KeyboardDoubleArrowDownIcon sx={{ mx: 1, color: "blue" }} />
                      </IconButton>
                      :
                      <IconButton
                        size="large"
                        onClick={(e) => handleTranslate(e)}
                      >
                        <KeyboardDoubleArrowUpIcon sx={{ mx: 1, color: "red" }} />
                      </IconButton>
                  }
                </div>
                <div className={` flex flex-col justify-start items-center h-auto w-full`}>
                  {show &&
                    <Translation
                      translation={country.translations}
                      show={show}
                    />
                  }
                </div>
              </div>
              
              <div className="col-span-1  w-full shadow-lg shadow-blue dark:shadow-white text-center relative ">
                <div className="flex inline-flex gap-2 justify-center items-center "

                >
                  <h3 className="text-lg m-auto font-bold my-2" >currency</h3>
                  {
                    (showCurr) ?
                      <IconButton
                        size="large"
                        onClick={(e) => handleCurr(e)}
                        
                      >
                        <KeyboardDoubleArrowDownIcon sx={{ mx: 1, color: "blue" }} />
                      </IconButton>
                      :
                      <IconButton
                        size="large"
                        onClick={(e) => handleCurr(e)}
                       
                      >
                        <KeyboardDoubleArrowUpIcon sx={{ mx: 1, color: "red" }} />
                      </IconButton>
                  }
                </div>
                {(showCurr) &&

                  <CountryCurr

                    currency={country.currencies}
                    showCurr={showCurr}
                
                  />
                }


              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Link href={"/ultils/countries"}>
              <button className=" p-3 my-3 mt-[5rem] rounded-xl shadow-lg dark:shadow-white shadow-blue px-6">return</button>
              </Link>
            </div>
          </div>
          :
          <div className="col-span-none flex flex-col items-center justify-center">
            <h3 className="text-xl">loading...</h3>
          </div>
      }




    </div>
  )
}

export default CountryItem