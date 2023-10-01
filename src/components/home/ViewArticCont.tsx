"use client";
import React, { MouseEvent } from 'react';
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import Image from 'next/image';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const ViewArticCont = () => {
    const design = "https://www.masterconnect.ca/designs";
    const article = "https://new-master.s3.ca-central-1.amazonaws.com/static/article.png";
    const desImg = "https://new-master.s3.ca-central-1.amazonaws.com/static/images/design.png"
    const posts = "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/posts.png"
    const route = useRouter();
    const handleArticles = (e: MouseEvent) => {
        route.push("/articles")
    }
    const handleContact = (e: MouseEvent) => {
        route.push("/contact")
    }
    const handleDesigns = (e: MouseEvent) => {
        window.open(design, "blank");
    }
    const handlePosts = (e: MouseEvent) => {
        route.push("/posts");
    }
    return (
        <div className="lg:container lg:mx-auto m-0 dark:bg-slate-900 dark:text-white text-black bg-[whitesmoke] mb-0 pb-5 pt-5" >
            <div className="flex flex-row justify-around flex-wrap gap-3">
                <IconButton className="m-auto flex flex-col justify-center items-center  cursor-pointer"
                    onClick={(e) => handleArticles(e)}
                >
                    <Image src={article} width={125} height={125} alt="ww.masterconnect.ca"
                        className="m-auto  shadow-lg rounded-[50%] shadow-primary-700 dark:text-white text-black border border-primary-700 "
                    />

                </IconButton>
                <IconButton className="m-auto flex flex-col justify-center items-center  cursor-pointer"
                    onClick={(e) => handleDesigns(e)}
                >
                    <Image src={desImg} width={125} height={125} alt="www.masterconnect.ca" className="m-auto shadow-lg rounded-full px-1 shadow-lg shadow-blue-700 dark:text-white text-black border border-blue " />

                </IconButton>
                <IconButton className=" button m-auto flex flex-col justify-center items-center shadow-lg   cursor-pointer shadow-lg shadow-blue-300"
                    onClick={(e) => handlePosts(e)}
                >
                    <Image src={posts} width={145} height={145} alt="www.masterconnect.ca"
                        className="m-auto  shadow-lg rounded-[50%] dark:text-white text-black "
                    />

                </IconButton>
                <IconButton className="m-auto flex flex-col justify-center items-center shadow-lg rounded-full p-1 px-3 shadow-secondary-500 text-black border border-secondary-500 font-bold cursor-pointer dark:text-white"
                    onClick={(e) => handleContact(e)}
                >
                    <h3 className="text-2xl pt-2">get to</h3>
                    <ConnectWithoutContactIcon sx={{ color: "red" }} />
                    <h3 className="text-2xl pb-2">Know us</h3>

                </IconButton>
            </div>
        </div>
    )
}

export default ViewArticCont