import React from 'react'
import Contact from '@component/contact/Contact';
import type { Metadata } from 'next';
import { metacontact } from "@component/metadata/metacontact";

export const metadata: Metadata = metacontact;



const contact = () => {

  return (
    <div className="bg-[whitesmoke] w-full mx-0 w-full mb-4 lg:mb-0">
      <Contact />
    </div>
  )
}

export default contact