"use client";
import React from 'react'
import GetApi_ from "./GetApi_";


type listType={
    
    name:string,
    value:string

}[]

    const list:listType=[
        {name:"select Lang",value:"select"},
        {name:"english",value:"en"},
        {name:"french",value:"fr"},
        {name:"african",value:"af"},
        {name:"arabic",value:"ar"},
        {name:"armenian",value:"hy"},
        {name:"baskish",value:"eu"},
        {name:"belerusian",value:"be"},
        {name:"German",value:"de"},
        {name:"Dutch",value:"nl"},
        {name:"Spanish",value:"eo"},
        {name:"Scottish",value:"gd"},
        {name:"Greek",value:"el"},
        {name:"Indonesian",value:"id"},
        {name:"Japanese",value:"jp"},
        {name:"Persian",value:"fa"},
    ]

const MainApi = () => {
    const [reset,setReset]=React.useState<boolean>(false);
    const [ getAPI,setGetAPI]=React.useState<boolean>(false);
    
  return (
    <div className="container mx-auto p-1">
        
        <GetApi_ 
         list={list}
         reset={reset}
         setReset={setReset}
         setGetAPI={setGetAPI}
         getAPI={getAPI}
         />
    </div>
  )
}

export default MainApi