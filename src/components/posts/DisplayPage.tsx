"use client";
import React from 'react';
import Image from "next/image";
import { DataType, userType, PostDataType } from "@component/context/type";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SourceIcon from '@mui/icons-material/Source';
import { GeneralContext } from "@component/context/GeneralContextProvider";
import { convertDate } from "@component/ultilities";
import { Storage, StorageClass } from '@aws-amplify/storage';
import { API, graphqlOperation } from '@aws-amplify/api';
import { v4 as uuidv4 } from 'uuid';
import UpLoadS3 from './UpLoadS3';
import DisplayPagePost from './DisplayPagePost';
import { createImageAPI, updateImageAPI } from "@graphql/mutations";
import { getImageAPI, listImageAPIS } from "@graphql/queries";
import { userpost, userImage } from "@component/axios/awsprismabucket";




type mainDisplayType = {
    setUsersPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>,
    usersPosts: PostDataType[],
    userId: string | null
}
const DisplayPage = ({ usersPosts, setUsersPosts, userId }: mainDisplayType) => {
    const uuid = uuidv4().split("-").slice(0, 2).join("");
    const { account, setAllPosts, allPosts } = React.useContext(GeneralContext);
    const getUserId = userId ? userId : "";
    const picName = `${getUserId}-${uuid}`;
    // const [getData, setGetData] = React.useState<DataType>([]);
    const [postData, setPostData] = React.useState<PostDataType>(
        {
            id: null, userId: getUserId, title: undefined, content: undefined, imageKey: "", published: false, answers: []
        });
    const [selectedImage, setSelectedImage] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState<File | undefined>();
    const [uploading, setUploading] = React.useState(false);
    const [publish, setPublish] = React.useState<boolean>(false);
    const [msg, setMsg] = React.useState<{ loaded: boolean, msg: string | null }>({ loaded: false, msg: null });
    const [toUpdate, setToUpdate] = React.useState<boolean>(false);
    const [openImgBox, setOpenImgBox] = React.useState<boolean>(false);
    const [picSubmit, setPicSubmit] = React.useState<boolean>(false);




    function updatePosts(posts: PostDataType[], getUserId: string): void {
        if (posts) {
            const usersPosts = posts.filter(post => (post.userId === getUserId));
            setUsersPosts(usersPosts);
        }
    };



    //  console.log(postData,userId)   

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        const postContent = async () => {
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            }

            const res = await fetch(`/api/posts/createposts`, options);
            const body = await res.json();
            const loadData: PostDataType = await body;
            setUsersPosts([...usersPosts, loadData]);
            setMsg({ loaded: true, msg: "added" });
            setUploading(true);
            if (!res.ok) {
                setMsg({ loaded: false, msg: "not added" });
                throw new Error("failed to fetch")
            }
            // savePostImg(); // saving to S3
            setPostData({} as PostDataType);
            setSelectedImage("");
            setSelectedFile(undefined)
            setPublish(false);
            setAllPosts([...allPosts, body])
        }
        if (postData && postData.title && userId) {
            postContent();
        }
    }
    const handleDelete = (e: React.MouseEvent, id: number) => {
        const deletePost = async () => {
            try {
                const res = await fetch(`/api/posts/posts?postId=${id}&userId=${userId}`);
                const body = await res.json();
                const data: PostDataType = await body
                if (!res.ok) {
                    if (res.status === 404) {
                        const body: { message: string } = await res.json()
                        setMsg({ loaded: false, msg: body.message })
                    } else {
                        setMsg({ loaded: false, msg: "it did not delete. something went wrong" })
                    }
                }
                if (data) {
                    setMsg({ loaded: true, msg: `${data.title} item deleted` });
                    setUsersPosts(
                        usersPosts.filter(obj => (obj.id !== id))
                    )
                    setAllPosts(allPosts.filter(post => (post.id !== id)))
                }
            } catch (error) {
                setMsg({ loaded: false, msg: " item not deleted- something went wrong" });
                throw new Error("dot deleted");

            }

        }
        if (id && userId) {
            deletePost();
        } else {
            setMsg({ loaded: false, msg: "missing ID" })
        }
    }
    const handleEdit = (e: React.MouseEvent) => {
        // console.log("OBJ FROM HANDLEEDIT",obj)

        e.preventDefault();
        const editPost = async () => {
            const options = {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            }
            const res = await fetch(`/api/posts/update`, options);
            if (!res.ok) {
                setMsg({ loaded: false, msg: "sorry it did not update" })
                throw new Error(" did not edit message")
            }
            const body: PostDataType[] = await res.json()
            setMsg({ loaded: true, msg: "record updated" })
            setToUpdate(false);
            setPostData({} as PostDataType)
            setPublish(false);
            setAllPosts(body);
            updatePosts(body as PostDataType[], getUserId);

        }
        if (postData && userId) {
            editPost();
        }
    }
    const handleToUpdate = (e: React.MouseEvent, obj: PostDataType): void => {
        e.preventDefault();
        if (userId && obj.content && obj.title) {
            if (publish && obj.published) {
                setPublish(obj.published);
            }
            setToUpdate(true);
            setPostData(obj);
        }

    }


    return (
        <div className="z-0  w-full flex flex-col items-center justify-between font-mono  mt-10  ">
            <div className="text-center text-5xl my-3 text-amber-600">Post creator</div>
            <div className="relative w-full lg:w-3/4">
                <form encType="multipart/form-data" className=" relative m-auto p-4 my-2 flex flex-col items-center justify-center gap-4 shadow-lg shadow-black rounded-lg w-full sm:w-3/4 lg:w-1/2 p-2 border border-blue">
                    <label htmlFor="title" className="text-lg text-center">Title</label>
                    <input
                        id="title"
                        value={postData.title ? postData.title : ""}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        className="shadow-md shadow-blue-500 rounded-md p-3 bg-white text-black rounded-md"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="file" className=" m-auto text-center text-lg my-2 p-2 text-blue font-bold underline underline-offset-5">Image selection</label>


                        {selectedImage ? (
                            <div className="w-40 aspect-video rounded flex flex-col items-center justify-center justify-center border-2 border-dashed cursor-pointer">
                                <Image src={selectedImage} alt="www" width={125} height={125} />
                            </div>
                        ) : (

                            <div className="text-lg text-red text-sm px-3 rounded-full shadow shadow-blue border border-blue  py-2 underline hover:underline-offset-2 hover:cursor-pointer" onClick={() => setOpenImgBox(true)}>select image</div>


                        )
                        }


                    </div>
                    <label htmlFor="content" className="text-lg text-center">content</label>
                    <textarea
                        rows={4}
                        cols={20}
                        id="content"
                        value={postData.content ? postData.content : ""}
                        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                        className="my-3 w-full bg-white text-black shadow-md shadow-blue-400 p-3 rounded-lg"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="published" className=" m-auto text-center text-lg my-2 p-2">published?</label>
                        <input
                            type="checkbox"
                            aria-checked={publish}
                            id="published"
                            checked={postData.published ? postData.published : false}
                            onChange={(e) => setPostData({ ...postData, published: e.target.checked })}
                            className="m-auto bg-white text-blue"
                        />
                    </div>


                    <div className={`flex flex-col items-center justify-center gap-2 z-3000`}>
                        {!toUpdate ?
                            <button
                                disabled={uploading}
                                className={`flex flex-col items-center justify-center px-5 p-2 border border-blue-800 rounded-lg`}
                                onClick={(e) => handleSubmit(e)}
                            >
                                submit
                            </button>
                            :

                            <button className="flex flex-col items-center justify-center px-5 p-2 border border-blue-800 rounded-lg" onClick={(e) => handleEdit(e)}>
                                update
                            </button>
                        }
                    </div>

                    {msg.loaded ?
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-center text-xl text-blue-800">{msg.msg}</h3>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-center text-lg text-red-600 font-bold">{msg.msg}</h3>
                        </div>
                    }
                </form>
                <div className={(!picSubmit && openImgBox) ? "absolute inset-0  w-3/4 mx-auto container" : "hidden"}>
                    <UpLoadS3
                        postData={postData}
                        setPostData={setPostData}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                        setUploading={setUploading}
                        uploading={uploading}
                        setPicSubmit={setPicSubmit}
                        userId={getUserId}
                    />
                </div>
            </div>

            {postData &&
                <>
                    <div className="text-center text-5xl my-5">Just Posted</div>
                    <div className="m-auto flex flex-col items-center justify-center w-full sm:w-1/2 lg:w-1/3">


                        <div className="mx-auto p-3 flex flex-col items-center justify-center">
                            <div className="mx-auto p-3 text-xl" >title</div>
                            <div className="mx-auto p-3 text-lg" >{postData.title}</div>
                            {postData.imageKey &&
                                <Image src={postData.imageKey} width={300} height={300} alt="www.masterconnect.ca"
                                    className="aspect-video" />
                            }
                            <div className="mx-auto p-3">published:{postData.published ? "true" : "false"}</div>
                            <div className="mx-auto p-3 text-lg">content:</div>
                            <div className="mx-auto p-3 text-lg leading-6">{postData.content}</div>
                        </div>

                    </div>
                </>
            }
            <div className="text-center text-5xl my-5">Your posts</div>
            <div className="m-auto p-2 gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ">
                {usersPosts && usersPosts.sort((a, b) => b.id! - a.id!).map((obj, index) => (
                    <div className="mx-0 p-3 col-span-1 shadow-md shadow-blue-600 rounded-md flex flex-col items-center justify-center" key={`${obj.id}-${index}-`} >
                        <DisplayPagePost
                            obj={obj}
                            handleDelete={handleDelete}
                            handleToUpdate={handleToUpdate}
                        />
                    </div>
                ))}
            </div>


        </div>
    )
}

export default DisplayPage