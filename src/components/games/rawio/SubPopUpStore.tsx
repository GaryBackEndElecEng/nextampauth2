"use client";
import React, {MouseEvent} from 'react';
import Image from "next/image";
import Link from 'next/link';

type storeType={
    
    id: number,
    store: {
      id: number,
      name: string,
      slug: string,
      domain: string,
      games_count: 4760,
      image_background: string
  }
  }
const SubPopUpStore = ({stores}:{stores:storeType[]}) => {
    function openLink(link:string){
        let http="https://" + link
        console.log("link",http)
        return window.open(http,"_blank","popup");
    }
    const handlePopup=(e:MouseEvent<HTMLImageElement> | undefined,link:string)=>{
        e?.preventDefault();
        openLink(link);
    }
  return (
    <div>
        <h3 className="text-center text-xl font-bold mx-auto my-2 p-1">stores</h3>
        <ul className="grid grid-cols-1 place-items-center sm:grid-cols-2 grid-flow-row-dense">
        {stores && stores.map((store,index)=>(
            <div className="auto-cols-auto p-1" key={`${store.id}-genre-${index}`}>
            <h6 className="m-auto text-center text-4md">{store.store.name}</h6>
                <Image 
                src={store.store.image_background}
                alt={`www.masterconnect.ca-${store.store.slug}`}
                width={400}
                height={400}
                // fill
                className="object-fit rounded-ml aspect-video cursor-pointer"
                onClick={(e)=>handlePopup(e,store.store.domain)}
                />
                <small>Stock: {store.store.games_count}</small>
            </div>
        ))}
        </ul>
    </div>
  )
}

export default SubPopUpStore