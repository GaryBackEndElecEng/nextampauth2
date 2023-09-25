"use client"
import React from 'react';
import Header_ from "@/components/header/Header_"
import { ThemeContext } from '../context/ThemeContext';

const HeaderMain = () => {
    const { theme } = React.useContext(ThemeContext);
    return (
        <div className={`${theme} bg-white dark:bg-black text-black dark:text-white`}>
            <Header_ />
        </div>
    )
}

export default HeaderMain