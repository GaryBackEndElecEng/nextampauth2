"use client";
import React from 'react';
import type { DataType, PostDataType, addCommentType, userType, answerType } from "@component/context/type";
import Image from "next/image";
import type { imageCategory } from "@component/context/Types";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button, IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SourceIcon from '@mui/icons-material/Source';
import { useRouter } from "next/navigation";
import { GeneralContext } from "@component/context/GeneralContextProvider";
import { GeneralContextNoAcc } from "@component/context/GeneralContext";
import PostAnswer from "./PostAnswer";
import Answers from "./Answers";
import { convertDate } from "@component/ultilities";
import Comments from "./Comments";
const logo = `${process.env.NEXT_PUBLIC_aws}/logo.png`;

type showType = {
    loaded: boolean,
    id: number | null
}

type mainDisplayType = {

    userId: string | null,
    chela: string,


}
const AllSubPosts = ({ userId, chela }: mainDisplayType) => {
    const { extraImages } = React.useContext(GeneralContextNoAcc);
    const { userInfos, allPosts } = React.useContext(GeneralContext);
    const router = useRouter();
    const [addComment, setAddComment] = React.useState<addCommentType>({ loaded: false, postId: null });
    const [saved, setSaved] = React.useState<boolean>(false);


    const userInfo = React.useCallback((id: string) => {
        if (userInfos) {
            const userAttr = userInfos.find(user => (user.id === id));
            if (userAttr) {
                return (
                    <div className="flex flex-row items-center justify-center gap-2">
                        <p className="my-2 mx-auto text-lg text-orange">{userAttr.name.split(" ")[0]}</p>
                        {(userAttr.image && userAttr.name) &&
                            <Image src={userAttr.image} alt={userAttr.name} width={55} height={55}
                                className="rounded-[50%] shadow shadow-blue"
                            />
                        }
                    </div>
                )
            } else { return <></> }
        }
    }, [userInfos]);

    React.useEffect(() => {
        if (saved) {
            setAddComment({ loaded: false, postId: null })
        }
    }, [saved]);


    const getPic = React.useCallback((): string | null => {
        if (extraImages) {
            let len = extraImages.length * 1.3
            let rand = Math.floor(Math.random() * len);
            let img: string = extraImages?.filter(obj => (obj.id > rand))[0].image || logo;
            return img as string

        }
        return null

    }, [extraImages]);

    const routeToDashboard = (e: React.MouseEvent, userid: string) => {
        e.preventDefault();
        if (userId === userid) {
            router.push("/dashboard");
        }
    }
    const handleAddComment = (e: React.MouseEvent, id: number | null) => {
        e.preventDefault();
        setSaved(false);
        if (!(addComment.loaded && id && addComment.postId == id)) {
            setAddComment({ loaded: true, postId: id });

        } else {
            setAddComment({ loaded: false, postId: null })
        }
    }




    return (
        <div className={`${chela} z-0 max-w-5xl w-full flex flex-col items-center justify-center  text-sm mt-10 dark:bg-black dark:text-white text-site_blue_dark bg-white`}>
            <div className="text-center text-5xl my-3 text-amber-600">Posts</div>
            <div className="text-center text-2xl my-3 text-amber-600">login to add a comment</div>

            <div className="m-auto p-2 gap-1 md:gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {(allPosts) && allPosts.map((post, index) => (
                    <div key={`${post.id}-${index}-`}
                        className="flex flex-col items-center"
                    >
                        <div className={`flex flex-row flex-wrap mx-auto justify-between gap-2 w-full ${userId && post.userId === userId ? " cursor-pointer" : ""}`} onClick={(e) => routeToDashboard(e, post.userId)}>
                            {getPic() && <Image src={getPic() as string} alt="www.masterconnect.ca" width={35} height={25} className="rounded-full shadow-md shadow-blue" blurDataURL={getPic() as string} />}
                            <div className={`${userId === post.userId ? "text-blue-500 text-underline" : " text-black"} mx-auto px-3 py-auto text-md shadow-md rounded-md shadow-blue-500 flex items-center gap-2`} >
                                <span className="text-md font-bold">{userInfo(post.userId)}</span>
                                <span className="text-sm font-bold text-blue-700">{post.title}</span>
                            </div>
                        </div>

                        <div className={`flex flex-row flex-wrap mx-auto items-center  ${userId && post.userId === userId ? " cursor-pointer" : ""}`} onClick={(e) => routeToDashboard(e, post.userId)}>


                            <button className="px-3 bg-blue m-3 border border-orange shadow shadow-blue rounded-full"
                                onClick={() => {
                                    router.push(
                                        `/posts/id?id=${post.id}`
                                    )
                                }}
                            >Detail</button>
                            {
                                post.userId === userId &&
                                <IconButton  >
                                    <ManageAccountsIcon sx={{ m: 3, background: "bleu", color: "red", fontSize: "120%" }} /><span className="underline underline-offset-8 text-red">
                                        {userInfo(post.userId)}
                                    </span>
                                </IconButton>
                            }
                        </div>
                        {post.imageKey &&
                            <Image src={post.imageKey} alt="www.masterconnect.ca" height={400} width={400} className="aspect-video" />
                        }
                        <div className="lg:mx-auto py-3 mx-0 text-green" >published:{post.published ? "true" : "false"}</div>
                        <div className="mx-auto p-3 text-xl inline-flex" >
                            <SourceIcon sx={{ color: "red", ml: 2, mr: 2 }} />
                            content:
                        </div>
                        <div className="mx-0 p-1 text-xl" >{post.content}</div>

                        <h4 className="text-sm text-center">Date</h4>
                        <div className="text-center my-2 text-md">
                            {post.date && convertDate(post.date)}
                        </div>
                        <Comments
                            post={post}
                            userInfo={userInfo}
                        />
                        {(addComment.loaded && addComment.postId === post.id && !saved) &&
                            <PostAnswer

                                chela={chela}
                                postId={post.id}
                                userId={userId}
                                setSaved={setSaved}
                            />}
                        <div className="flex flex-col items-center justify-center my-2">
                            {userId && <button className="px-3 py-1 text-md rounded-md shadow shadow-blue" onClick={(e) => handleAddComment(e, post.id)}>
                                {(addComment.postId !== post.id) ? <span className="text-site_mint"> add a thought</span>
                                    :
                                    <span className="text-orange"> close</span>
                                }
                            </button>}
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default AllSubPosts