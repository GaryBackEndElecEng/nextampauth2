"use client"
import React from 'react';
import Header_ from "@/components/header/Header_"
import { ThemeContext } from '../context/ThemeContext';
import styles from "./header.module.css"

const HeaderMain = () => {
    const { theme } = React.useContext(ThemeContext);
    return (
        <div className={`${theme} ${styles.headerMain} bg-white dark:bg-black text-black dark:text-white z-1 `} >
            <Header_ />
        </div>
    )
}

export default HeaderMain