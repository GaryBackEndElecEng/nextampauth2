"use client";
import React from 'react';
import axios, { AxiosError } from 'axios';

const location = async () => {
    const url:string="https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json"
            try {
                const res= await axios.get(url);
                return res.data
            } catch (error) {
                console.error(((error:AxiosError)=>error.message));
                return null
            }
  
}

export default location