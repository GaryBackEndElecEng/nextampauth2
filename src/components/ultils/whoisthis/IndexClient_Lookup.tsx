"use client";
import React from 'react';
import GetClient_DNSlookup from './GetClient_DNSlookup';

const IndexClient_Lookup = () => {
  return (
    <div className="flex flex-col items-start justify-center my-2 lg:mx-auto w-full ">
        <h3 className="text-xl text-center font-bold my-2 mx-auto">DNS Lookup</h3>
        <GetClient_DNSlookup/>
    </div>
  )
}

export default IndexClient_Lookup