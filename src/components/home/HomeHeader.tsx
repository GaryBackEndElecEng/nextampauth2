import React from 'react';
import Image from 'next/image';

const HomeHeader = () => {
    const URL = process.env.NEXT_PUBLIC_aws;
    const happy = `${URL}/happy.png`;
    const logo = `${URL}/logoLarge.png`;

    return (
        <div className=" homeHeader my-0 mx-0  lg:mx-auto text-black dark:text-white bg-[whitesmoke] dark:bg-black pb-4">

            <p className="free text-6xl text-center mx-auto whitespace-normal mt-2 py-2">Free Resources,  from:
            </p>
            <div className="h-[3px] w-full my-2 bg-[var(--background-image-2)]" style={{ background: "var(--background-image-2)" }} />
            <div className="flex flex-col justify-center align-center relative p-1 my-2">

                <div className="m-auto flex flex-col w-full md:w-3/4 lg:w-1/2 gap-2 p-2 border border-blue dark:border-white rounded-lg shadow-lg dark:shadow-white shadow-blue dark:bg-site_blue_dark bg-light_marron">

                    <Image src={logo} width={85} height={85} alt="www.masterconnect.ca"
                        className=" mx-auto "
                    />
                    <div className=" mx-auto ">
                        <p className="text-2xl text-center m-auto whitespace-normal text-indigo-500 font-bold">www.masterconnect.ca</p>
                    </div>
                    <Image src={happy} width={85} height={85} alt="www.masterconnect.ca"
                        className=" mx-auto "
                    />

                </div>
            </div>
        </div>
    )
}

export default HomeHeader