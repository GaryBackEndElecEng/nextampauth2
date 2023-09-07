"use client";
import React from 'react'
import api from "../axios/api";
import {AxiosError} from "axios";
import {Container} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {ArticleContext} from "@context/GeneralContext";
import {articlesType} from "@context/Types";


const Articles = () => {
    const {articles}=React.useContext(ArticleContext);
    
  return (
    
    <Container maxWidth="lg" className="dark:bg-black dark:text-white bg-[rgba(255,255,255,0.7)] text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:gap2 lg:gap-3">
            {
                articles ? articles.map((article,index)=>(
                    <div className="col-span-1 mx-auto p-2 shadow-lg shadow-blue rounded-lg my-2" key={`${article.id}-${index}`}>
                        <h3 className="text-2xl text-center my-2">{article.title}</h3>
                        <h3 className="text-xl text-center my-2">{JSON.stringify(article.article[0]?.section)}</h3>
                        <Image src={article.article[0]?.imageSection} width={600} height={400} alt="www.masterconnect.ca"/>
                       
                        <div className="flex flex-col m-auto items-center justify-center rounded-lg px-3 p-1 my-2 border shadow-md shadow-site_blue_grey hover:shadow-blue hover:tracking-widest">
                            <Link href={`/articles/${article.id}`}>open</Link>
                        </div>

                    </div>
                ))
                :
                <div className="grid-cols-none flex flex-col items-center justify-center">
                    <div className="text-lg text-center">loading...</div>
                </div>
            }
        </div>
    </Container>
    
  )
}

export default Articles