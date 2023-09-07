import React from 'react'
import IndexCountry from "@/components/extra/miscgraph/IndexCountry";
import type {Metadata} from 'next';
import {metaworld} from '@/components/metadata/metaextra';

export const metadata =metaworld;

const CountryGraphDisplay = () => {
  return (
    <div className="lg:mx-auto lg:container flex flex-col w-full items-center justify-start">
      <IndexCountry />
    </div>
  )
}

export default CountryGraphDisplay