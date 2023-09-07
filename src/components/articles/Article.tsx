"use client";
import React from 'react';
import { useRouter } from 'next/router';
import api from "../axios/api";
import { Container } from "@mui/material";
import Image from "next/image";
import { ArticleContext } from '../context/GeneralContext';
import {articleType} from "@context/Types";


const Article = ({ id }: { id: string | null }) => {
    const {articles}=React.useContext(ArticleContext);
    const [article, setArticle] = React.useState<articleType | null>(null);

    React.useMemo(() => {
        if(id && articles.length>0){
        let temp:articleType=articles.filter((obj)=>(obj.id===parseInt(id)))[0].article[0];
        if(temp){
        setArticle(temp)
        }
        }
    }, [id, articles]);

    const createMarkup = (text1: string) => {
        if (text1) {
            let len = text1.split(" ");
            if (len.length > 0) {
                return { __html: text1 };
            } else {
                return { __html: "" };
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <div className="flex flex-col items-center justify-center">
                {article ?
                    <div className="flex flex-col items-start justify-center">
                        <div className="mx-auto flex flex-col items-center justify-center my-2">
                        <h3 className="text-center text-3xl my-2 mx-auto font-bold">{article.section}</h3>
                        <Image src={article.imageSection} height={900} width={900} alt="www.masterconnect.ca" className="aspect-video m-auto"/>
                        </div>
                        <h4 className="text-center text-xl my-2 mx-auto font-bold">{article.section}</h4>
                        <div className="text-md indent-4 my-1"
                            dangerouslySetInnerHTML={createMarkup(article.summary)}
                        />
                        <h4 className="text-center text-xl my-2 mx-auto font-bold">{article.subSection}</h4>
                        <div className="text-md indent-4 my-1"
                            dangerouslySetInnerHTML={createMarkup(article.content)}
                        />
                        <h4 className="text-center text-xl my-2 mx-auto font-bold">{article.subSection1}</h4>
                        <div className="text-md indent-4 my-1"
                            dangerouslySetInnerHTML={createMarkup(article.content1)}
                        />
                        <h4 className="text-center text-xl my-2 mx-auto font-bold">{article.subSection2 && article.subSection2}</h4>
                        <div className="text-md indent-4  my-1"
                            dangerouslySetInnerHTML={createMarkup(article.content2 && article.content2)}
                        />
                        <small className="text-left font-bold">date submitted: {article.date && article.date}</small>
                    </div>
                    :
                    <h3 className="text-center text-xl my-2 mx-auto">loading...</h3>
                }
            </div>
        </Container>
    )
}

export default Article