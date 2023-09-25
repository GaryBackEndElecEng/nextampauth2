import React from 'react';
import GetDetail from "./Get_detail";
import { metapost } from "@component/metadata/metaposts"

export const metadata = metapost;

const page = () => {

    return (
        <div className="lg:mx-auto lg:container w-max-md">
            <GetDetail />
        </div>
    )
}

export default page