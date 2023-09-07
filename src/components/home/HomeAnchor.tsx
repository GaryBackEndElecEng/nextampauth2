import React from 'react'
import "./home.css"
type homeAnchorType={
    href:string,
    title:string,
    title2:string
}

const HomeAnchor = ({href,title,title2}:homeAnchorType) => {
  return (
    <a href={href} className="w-full h-full flex flex-col justify-center items-center bg-slate_blue shadow-lg dark:shadow-white shadow-blue">
        <h3 className="text-white text-xl p-1" style={{fontSize:"150%",background:"rgba(0,0,0,.6"}}> www.masterconnect.ca</h3>
        <div className="m-auto card hover:shadow-lg shadow-teal-800">
            <div className="card flex flex-col justify-center items-center">
            <p className="webDesign text-xl text-center my-2 mx-auto">{title}</p>
            <p className="webDesign text-xl text-center my-2 mx-auto" >{title2}</p>
            </div>
            
        </div>
       </a>
  )
}

export default HomeAnchor