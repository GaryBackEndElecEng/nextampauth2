"use client";
import React, { MouseEvent } from 'react';
import { GeneralContextNoAcc } from "@context/GeneralContext";
import axios, { AxiosError, isAxiosError } from "axios";
import api from '../axios/api';
import { Container, Grid, Fab } from '@mui/material';
import Image from "next/image";
import styles from './contact.module.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';



type weChooseType = {
    open: boolean,

}
type openContentType = {
    bool: boolean,
    index: number | null
}
const WeChooseUs = ({ open }: weChooseType) => {
    const { whyChooseUs } = React.useContext(GeneralContextNoAcc);
    const url: string | undefined = process.env.NEXT_PUBLIC_serverApi;
    const [openContent, setOpenContent] = React.useState<openContentType>({ bool: false, index: null });

    const handleContent = (e: MouseEvent, index: number) => {
        e.preventDefault();
        if (!openContent.bool) {
            setOpenContent({ bool: true, index: index });
        } else {
            setOpenContent({ bool: false, index: null });
        }
    }


    return (
        <Container maxWidth="xl">
            <div className={`${open ? `grid ${styles.whatWeDo}` : "hidden "}  m-0 grid-cols-1 md:grid-cols-2 gap-2 auto-rows-auto  opacity-100`}>
                {whyChooseUs ?
                    whyChooseUs.map((obj, index) => (
                        <div className="col-span-1 p-2 shadow-lg shadow-blue rounded-lg" key={`${obj.id}-${index}`}
                        >
                            <div className="m-auto flex lg:flex-row flex-col flex-wrap items-center justify-center gap-4 my-1 p-1">
                                <Image src={obj.image} height={200} width={200} alt="www.masterconnect.ca"
                                className="rounded-[50%] shadow-lg shadow-blue dark:shadow-white"
                                />
                                <h3 className="text-3xl text-center mx-auto text-blue mb-2">{obj.title}</h3>
                            </div>
                            
                            <h5 className="text-lg mt-3 mb-1">summary</h5>
                            <h6 className="text-3md indent-3 whitespace-normal px-1 lg:px-3">{obj.summary}</h6>
                            <div className="flex flex-col items-center justify-center">
                                {!(openContent.bool && openContent.index === index) ?
                                    <button onClick={(e) => handleContent(e, index)}
                                        className="hover:shadow-site_blue_dark border border-blue bg-[whitesmoke] hover:bg-black px-6 rounded-3xl hover:text-white hover:tracking-widest transition-all px-4 text-black"

                                    >
                                        <KeyboardDoubleArrowUpIcon /> more
                                    </button>
                                    :
                                    <button onClick={(e) => handleContent(e, index)}
                                        className="bg-black text-white shadow shadow-blue rounded-xl px-4"
                                    >
                                        <KeyboardDoubleArrowDownIcon /> less
                                    </button>
                                }
                            </div>
                            {(openContent.bool && openContent.index === index) && <p className="text-3md indent-3 whitespace-normal px-1 lg:px-3 slide-up">{obj.content}</p>}

                        </div>
                    ))
                    :
                    <div className="col-span-2 ">
                        <h3 className="text-center text-xl">loading...</h3>
                    </div>
                }
            </div>
        </Container>
    )
}

export default WeChooseUs