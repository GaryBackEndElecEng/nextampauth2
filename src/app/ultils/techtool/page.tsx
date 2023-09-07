import React from 'react';
import MainIndexEmail from "@/components/ultils/emailTool/MainIndexEmail";
import IndexClientDetail from "@/components/ultils/whoisthis/IndexClientDetail";
import IndexClient_Lookup from "@/components/ultils/whoisthis/IndexClient_Lookup";
import Image from "next/image";
import {metatechtool} from '@component/metadata/metaultils';
import type {Metadata} from 'next';
export const metadata:Metadata=metatechtool;

const emailPage = () => {
    const URL = process.env.NEXT_PUBLIC_aws;
    const happy = `${URL}/happy.png`;
    return (
        <div className="flex flex-col items-center lg:mx-auto lg:container bg-[whitesmoke] dark:bg-black text-black dark:text-white">
            <div className="flex flex-row justify-center items-center gap-1 my-4 mt-10 lg:mt-4 lg:mx-auto">
                <Image src={happy} width={75} height={75} alt="www.masterconnect.ca"
                className="rounded-[50%] p-2 shadow-lg shadow-blue bg-black"
                />
                <h3 className="text-3xl text-center my-3">Tech-tools for you</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center my-3">
                <MainIndexEmail />
            </div>
            <IndexClientDetail />
            <IndexClient_Lookup />
        </div>
    )
}

export default emailPage