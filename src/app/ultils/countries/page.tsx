
import React from 'react';
import AllCountries from './AllCountries';
import {metacountries} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metacountries;

const countries = () => {
  return (
    
    <AllCountries/>
   
  )
}

export default countries