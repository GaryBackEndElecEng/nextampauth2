import React from 'react'
import styles from './footer.module.css';
import Image from "next/image";
import { Chela_One } from 'next/font/google';
const chela=Chela_One({subsets:["latin"],weight:["400"]});
type testTYpe={
    name:string
}


const Footer = () => {
    const URL =process.env.NEXT_PUBLIC_aws
    const logo = `${URL}/logo.png`;
    const  phone=`${URL}/phone.png`;
    return (
        <footer className={` bg-gradient-footer  mb-0 text-white ${styles.footerMain} `}>
            <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[15px] grid-flow-dense justify-items-center">
                <div className="logoPlus -order-1 cols-span-1 m-auto p-2 min-h-[10vh] min-w-1/3 flex flex-col justify-center items-center">
                    <a href="https://www.masterconnect.ca/contact" 
                    className="shadow-xl shadow-grey px-2 rounded-lg text-black hover:shadow-black hover:bg-blue transition-all hover:tracking-wide">
                        <div className="flex flex-row flex-wrap justify-center items-center">
                            <Image src={logo} width={125} height={125}
                                alt="www.masterconnect.ca"
                                className="aspect-video p-1 rounded-[50%]"
                            />
                            <h3 className={`${chela.className} text-center text-xl hover:tracking-widest`}>Web Services</h3>
                        </div>
                    </a>
                    <h6 className="text-center text-lg">Customized Websites to your liking.We give you peace-of-mind.</h6>
                </div>
                <div className={` order-last lg:order-2  m-auto p-2 min-h-[10vh] min-w-1/3 flex flex-col justify-center items-center cols-spans-1 `}>
                    <h3 className=" text-center text-xl my-2">@copywrite master-connect.ca</h3>
                    <a href="https://www.masterconnect.ca/services" className="flex flex-col my-1 mx-0 hover:shadow-lg hover:shadow-blue ">
                    <button className="button flex flex-col items-center justify-center p-1 px-2 hover:bg-blue transition-all">
                        <h3 className="text-center text-xl p-1 mb-2 hover:tracking-widest">Why Us?</h3>
                    </button>
                    </a>
                    <a href={"/terms-of-service"} className="text-xl text-site_green_dark p-2 m-1 rounded-md shadow-lg hover:tracking-widest hover:shadow-black">policy</a>
                </div>
                <div className={"logoPlus cols-spans-1 order-2 lg:order-last m-auto p-2 min-h-[10vh] min-w-1/3 flex flex-col justify-center items-center"}>
                    <h3 className="text-center text-xl tracking-widest underline leading-4">CONTACT</h3>
                    <div className="h-[5px] w-[100%] bg-black border"/>
                    <h6 className="text-center text-xl">site: www.masterconnect.ca</h6>
                    <a href="tel:416-917-5768" className="flex flex-col my-1 mx-0 rounded-xl hover:shadow-lg hover:shadow-blue text-xl hover:tracking-widest transition-all ">
                    <h6 className="text-center flex flex-row flex-nowrap justify-center items-center gap-2 ">
                        <Image src={phone} width={65} height={65} alt="www.masterconnect.ca"
                        className="rounded-[50%] bg-white hover:shadow-lg hover:shadow-blue hover:bg-blue"
                        />
                          Call Us</h6>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer