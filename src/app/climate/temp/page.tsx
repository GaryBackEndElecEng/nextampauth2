import React from 'react'
import MainChart from "@climate/temperature/MainChart";

const page = () => {
    return (
        <div className="lg:mx-auto  w-full flex flex-col justify-center items-center pt-3 pb-1 mx-2">
            <div className="text-center text-xl my-1 font-bold underline underline-offset-8 text-blue-600 mt-20 lg:mt-0 mb-6">Global temperature trend</div>
            <MainChart />
        </div>
    )
}

export default page