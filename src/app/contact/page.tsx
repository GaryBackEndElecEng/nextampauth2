import React from 'react'
import Contact from '@component/contact/Contact';
import type {Metadata} from 'next';
import {metacontact} from "@component/metadata/metacontact";

export const metadata:Metadata=metacontact;



const contact = () => {
  return (
    <div className="bg-[whitesmoke] w-full m-0">
        <Contact/>
    </div>
  )
}

export default contact