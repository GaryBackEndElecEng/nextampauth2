"use client";

import React from 'react';
import Articles from "./Articles";
import { ArticalContextProvider } from "@context/GeneralContext";
import { ThemeContext } from '../context/ThemeContext';


const ArticlesMain = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ArticalContextProvider>
      <div className={`${theme} text-black bg-white dark:bg-black dark:text-white m-0 p-0`}>
        <Articles />
      </div>
    </ArticalContextProvider>
  )
}

export default ArticlesMain
