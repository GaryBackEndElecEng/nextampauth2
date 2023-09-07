"use client";
import React, { MouseEvent} from 'react';
import { useRouter } from "next/navigation";

const ViewArticCont = () => {
    const design="https://www.masterconnect.ca/designs";
    const route = useRouter();
    const handleArticles = (e: MouseEvent) => {
        route.push("/articles")
    }
    const handleContact = (e: MouseEvent) => {
        route.push("/contact")
    }
    const handleDesigns=(e:MouseEvent)=>{
        window.open(design,"blank");
    }
    const handlePosts=(e:MouseEvent)=>{
        route.push("/posts");
    }
    return (
        <div className="lg:container lg:mx-auto my-1 dark:bg-black dark:text-white text-black bg-[rgba(255,255,255,0.6)] mb-4 pb-5 pt-5" >
            <div className="flex flex-row justify-around flex-wrap gap-3">
                <div className="m-auto flex flex-col justify-center items-center shadow-lg rounded-lg p-1 px-3 shadow-blue dark:text-white text-black border border-blue font-bold cursor-pointer"
                    onClick={(e) => handleArticles(e)}
                >
                    <h3 className="text-2xl p-2">View</h3>
                    <h3 className="text-2xl p-2">Articles</h3>

                </div>
                <div className="m-auto flex flex-col justify-center items-center shadow-lg rounded-lg p-1 px-3 shadow-blue dark:text-white text-black border border-blue font-bold cursor-pointer"
                    onClick={(e) => handleDesigns(e)}
                >
                    <h3 className="text-2xl p-2">View</h3>
                    <h3 className="text-2xl p-2">Designs</h3>

                </div>
                <div className="m-auto flex flex-col justify-center items-center shadow-lg rounded-lg p-1 px-3 shadow-blue dark:text-white text-black border border-blue font-bold cursor-pointer"
                    onClick={(e) => handlePosts(e)}
                >
                    <h3 className="text-2xl p-2">see</h3>
                    <h3 className="text-2xl p-2">Posts</h3>

                </div>
                <div className="m-auto flex flex-col justify-center items-center shadow-lg rounded-lg p-1 px-3 shadow-blue dark:text-white text-black border border-blue font-bold cursor-pointer"
                    onClick={(e) => handleContact(e)}
                >
                    <h3 className="text-2xl p-2">get to</h3>
                    <h3 className="text-2xl p-2">Know us</h3>

                </div>
            </div>
        </div>
    )
}

export default ViewArticCont