"use client";

import React from 'react';
import {ArticalContextProvider} from "@context/GeneralContext";
import Article from "./Article";
import { useRouter } from 'next/router';

const MainArticle = ({ id }: { id: string | null }) => {
  React.useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
    }
  },[]);
  return (
    <ArticalContextProvider>
        <Article id={id}/>
    </ArticalContextProvider>
    
  )
}

export default MainArticle