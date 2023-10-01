"use client";
import React from 'react';
import type { PostDataType, msgType, userInfoType } from "@context/type";
import { GeneralContext } from "@context/GeneralContextProvider";
import Image from 'next/image';
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useRouter } from "next/navigation";

function convertDate(date: Date | string): string {
    if (typeof (date) === "string") {
        return date.split("T")[0]
    } else {
        return date.toISOString().split("T")[0]
    }
};

type detailPostType = {
    user: userInfoType | null,
    post: PostDataType | null,

}
const DetailPost = ({ user, post }: detailPostType) => {
    const router = useRouter();
    const { setMsg, msg, userInfos } = React.useContext(GeneralContext);



    function getUsername(userId: string): string | undefined {
        const username = userInfos?.find(user => (user.id === userId));
        if (userId && username) {
            return username.name.split(" ")[0]
        }
    }


    return (
        <div className="w-full lg:mx-auto lg:container lg:px-2 flex flex-col items-center justify-center gap-2 ">
            {msg.loaded ? (
                <h1 className="text-blue text-font underline underline-offset-8 mt-5">{msg.msg}</h1>
            ) : (
                <h2 className="text-orange text-font mt-5">{msg.msg}</h2>
            )}
            {
                post ? (
                    <div className="lg:mx-auto flex flex-col items-center justify-center px-3 lg:w-3/4">
                        <h3 className="text-lg p-3 underline underline-offset-8 font-bold">{post.title}</h3>
                        {post.imageKey && <Image src={post.imageKey} alt="www.masterconnect.ca" width={400} height={900} className="aspectvideo my-3" />}
                        <IconButton>
                            <CommentIcon sx={{ m: 2, color: "orange" }} />
                        </IconButton>
                        <h5 className="m-auto text-md w-full lg:w-3/4 lg:px-0 px-3">{post.content}</h5>
                        <div className="flex flex-row flex-wrap items-center justify-center gap-3 my-5 border border-blue rounded-lg shadow shadow-blue px-3">
                            <small className="text-center my-2 text-red">{user && user.name.split(" ")[0]}</small>
                            <small className="m-auto text-sm  font-bold">
                                {post.date && convertDate(post.date)}
                            </small>
                        </div>
                        <div className="flex flex-row gap-2 items-center p-2 border border-blue-600 drop-shadow drop-shadow-slate-600 rounded-lg items-center justify-center">
                            {post.answers && post.answers.length &&
                                post.answers.map((ans, index) => (
                                    <div className="m-auto flex flex-col items-center justify-center gap-1" key={index}>
                                        <IconButton>
                                            <CommentIcon sx={{ m: 2, color: "red" }} />
                                        </IconButton>
                                        <h6 className="m-auto text-md text-orange font-bold">{ans.answer}</h6>
                                        <h5 className="text-center my-2 font-bold">{getUsername(ans.userId) && getUsername(ans.userId)}</h5>
                                        <small className="m-auto text-sm  font-bold">
                                            {ans.date && convertDate(ans.date)}
                                        </small>

                                    </div>
                                ))
                            }
                        </div>
                        <button className="border border-blue shadow shadow-blue rounded-full px-4 my-3 bg-orange"
                            onClick={() => router.push("/posts")}
                        >
                            return
                        </button>
                    </div>
                ) : (
                    <h3 className="text-center text-red">Sorry there is no detail post</h3>
                )
            }
        </div>
    )
}

export default DetailPost