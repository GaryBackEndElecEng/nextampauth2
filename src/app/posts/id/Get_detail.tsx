"use client";
import React from 'react';
import Head from 'next/head';
import DetailPost from "@component/posts/DetailPost";
import { useSearchParams } from "next/navigation";
import type { PostDataType, userInfoType } from "@context/type";
import { GeneralContext } from '@/components/context/GeneralContextProvider';

export type InsertHeaderType = {
    title: string | undefined,
    content: string | undefined,
    src: string,
    id: string
}
export function InsertHeader({ title, content, src, id }: InsertHeaderType) {

    return (

        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title && title} key="post_title" />
            <meta property="og:description" content={content && content} key="post_description" />
            <meta property="og:image" content={src && src} key="post_image" />
            <link rel="canonical" href={`https://www.masterultils.com/posts/id?id=${id}`}></link>
        </Head>
    )
}
const GetDetail = () => {
    const searchparams = useSearchParams();
    const { setMsg, msg, userInfos } = React.useContext(GeneralContext);
    const [post, setPost] = React.useState<PostDataType | null>(null);
    const [user, setUser] = React.useState<userInfoType | null>(null);
    const id: string | any = searchparams?.get("id") ? searchparams.get("id") : null;

    React.useEffect(() => {
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, []);

    React.useMemo(async () => {
        if (id) {
            const res = await fetch(`/api/posts/detail?id=${id}`);
            if (!res.ok) {
                const body: { message: string } = await res.json();
                setMsg({ loaded: false, msg: body.message })
            }
            const body: PostDataType = await res.json();
            setPost(body);
            const getUser: userInfoType | undefined = userInfos?.find(user => (user.id === body.userId));
            if (getUser) {
                setUser(getUser);
            }

            setMsg({ loaded: true, msg: "Detail" });
        }
    }, [id, setMsg, setUser, userInfos, setPost]);

    return (
        <div className="lg:mx-auto lg:container w-max-md">
            <DetailPost
                post={post}
                user={user}
            />
            <InsertHeader
                src={(post && post.imageKey) ? post.imageKey : ""}
                title={(post && post?.title) ? post.title : undefined}
                content={(post && post?.content) ? post.content : undefined}
                id={id}
            />
        </div>
    )
}

export default GetDetail