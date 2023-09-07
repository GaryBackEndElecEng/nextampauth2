import React from 'react'
import Register from "@component/context/auth/Register";
import type {Metadata} from 'next';
import {metaregister} from "@component/metadata/metaregister";
import {genHash} from "@context/ultils";
export const metadata:Metadata=metaregister;


const page = () => {
  return (
    
    <div className=" lg:mx-auto lg:container relative mt-20 flex flex-col items-center  ">
      <h3 className="text-center mb-3">Thanks for joining</h3>
        <Register genHash={genHash}/>
    </div>
    
  )
}

export default page