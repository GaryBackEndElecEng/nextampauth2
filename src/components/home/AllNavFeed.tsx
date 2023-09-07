import React from 'react'
import {NavContext} from "@/components/context/GeneralContext";
import Image from "next/image";
import Link from "next/link";

const AllNavFeed = () => {
    const {navs}=React.useContext(NavContext);
  return (
    <div className=" mx-0 px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-1 gap-2">
            {navs.length>0 &&
            navs.map((nav,index)=>(
                <div className="span-col-1 mx-auto flex flex-col items-center justify-center shadow shadow-blue rounded-md" key={`${index}-${nav.id}`}>
                    <Link href={nav.link}>
                    <div className="text-center text-2xl my-2">{nav.icon}{nav.name}</div>
                    <Image src={nav.image} width={400} height={300} alt="www.masterconnect.ca" className="aspect-video rounded-lg shadow-md shadow-blue dark:shadow-white"/>
                    </Link>
                    <div className="my-2 px-2 mx-auto">
                        {
                    nav.desc.map((para,index)=>(
                        <div className="flex flex-col items-left justify-center text-lg" key={index}>
                            {para.para}
                        </div>
                    ))
                    }
                    </div>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default AllNavFeed