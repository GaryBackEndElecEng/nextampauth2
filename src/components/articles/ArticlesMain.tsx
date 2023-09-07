"use client";

import React from 'react';
import Articles from "./Articles";
import {ArticalContextProvider} from "@context/GeneralContext";

const ArticlesMain = () => {
    
  return (
    <ArticalContextProvider>
    <Articles/>
    </ArticalContextProvider>
  )
}

export default ArticlesMain
