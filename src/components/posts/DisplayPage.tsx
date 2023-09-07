"use client";
import React from 'react';
import { DataType, userType, PostDataType } from "@component/context/type";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SourceIcon from '@mui/icons-material/Source';
import { GeneralContext } from "@component/context/GeneralContextProvider";
import { convertDate } from "@component/ultilities"


type mainDisplayType = {
    setUsersPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>,
    usersPosts: PostDataType[],
    userId: string | null
}
const DisplayPage = ({ usersPosts, setUsersPosts, userId }: mainDisplayType) => {
    const { account,setAllPosts,allPosts } = React.useContext(GeneralContext);

    // const [getData, setGetData] = React.useState<DataType>([]);
    const [postData, setPostData] = React.useState<PostDataType | null>(null);
    const [title, setTitle] = React.useState<string | null>(null);
    const [content, setContent] = React.useState<string | null>(null);
    const [publish, setPublish] = React.useState<boolean>(false);
    const [msg, setMsg] = React.useState<{ loaded: boolean, msg: string | null }>({ loaded: false, msg: null });
    const [toUpdate, setToUpdate] = React.useState<boolean>(false);

    function updatePosts(post_:PostDataType){
        const remPosts=allPosts.filter(post=>(post.id !==post_.id));
        setAllPosts([...remPosts,post_]);
        const remUserPosts=usersPosts.filter(post=>(post.id !==post_.id));
        
        setUsersPosts([...remUserPosts,post_]);
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        const postContent = async () => {
            const data = { title: title, content: content, userId: userId, published: publish }
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            const res = await fetch(`/api/posts/createposts`, options);
            const body = await res.json();
            const loadData: PostDataType = await body;
            setUsersPosts([...usersPosts, loadData]);
            setMsg({ loaded: true, msg: "added" });
            if (!res.ok) {
                setMsg({ loaded: false, msg: "not added" });
                throw new Error("failed to fetch")
            }
            setPostData(body);
            setTitle(null);
            setContent(null);
            setPublish(false);
            setAllPosts([...allPosts,body])
        }
        if (title && content && userId) {
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
                    setAllPosts(allPosts.filter(post=>(post.id !==id)))
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
        let obj: PostDataType | null = null
        if (postData && title && userId && content) {
            obj = {
                id: postData.id,
                title: title,
                content: content,
                answers: postData.answers,
                published: publish,
                date: postData.date,
                userId: userId

            }
            setPostData(obj);
        }
        // console.log("OBJ FROM HANDLEEDIT",obj)

        e.preventDefault();
        const editPost = async () => {
            const options = {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
            const res = await fetch(`/api/posts/update`, options);
            if (!res.ok) {
                setMsg({ loaded: false, msg: "sorry it did not update" })
                throw new Error(" did not edit message")
            }
            const body: PostDataType = await res.json()
            setMsg({ loaded: true, msg: "record updated" })
            setToUpdate(false);
            setContent(null);
            setTitle(null);
            setPublish(false);
            updatePosts(body as PostDataType);

        }
        if (obj && userId) {
            editPost();
        }
    }
    const handleToUpdate = (e: React.MouseEvent, obj: PostDataType): void => {
        e.preventDefault();
        if (userId && obj.content && obj.title) {
            setContent(obj.content);
            setTitle(obj.title);
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
            <form className="m-auto p-4 my-2 flex flex-col items-center justify-center gap-4 shadow-lg shadow-black rounded-lg w-full sm:w-3/4 lg:w-1/2 p-2 border border-blue">
                <div className="text-lg text-center">Title</div>
                <input
                    id="title"
                    value={title ? title : ""}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-md shadow-blue-500 rounded-md p-3 bg-white text-black rounded-md"
                />
                <div className="text-lg text-center">content</div>
                <textarea
                    rows={4}
                    cols={20}
                    id="content"
                    value={content ? content : ""}
                    onChange={(e) => setContent(e.target.value)}
                    className="my-3 w-full bg-white text-black shadow-md shadow-blue-400 p-3 rounded-lg"
                />
                <div className="flex flex-col items-center justify-center">
                    <div className=" m-auto text-center text-lg my-2 p-2">published?</div>
                    <input
                        type="checkbox"
                        aria-checked={publish}
                        id="published"
                        checked={publish}
                        onChange={(e) => setPublish(e.target.checked)}
                        className="m-auto bg-white text-blue"
                    />
                </div>
                <div className={`flex flex-col items-center justify-center gap-2`}>
                    {!toUpdate ?
                        <button className={`flex flex-col items-center justify-center px-5 p-2 border border-blue-800 rounded-lg`} onClick={(e) => handleSubmit(e)}>
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
            {postData &&
            <>
            <div className="text-center text-5xl my-5">Just Posted</div>
            <div className="m-auto flex flex-col items-center justify-center w-full sm:w-1/2 lg:w-1/3">

                
                    <div className="mx-auto p-3 flex flex-col items-center justify-center">
                        <div className="mx-auto p-3 text-xl" >title</div>
                        <div className="mx-auto p-3 text-lg" >{postData.title}</div>
                        <div className="mx-auto p-3">published:{postData.published ? "true" : "false"}</div>
                        <div className="mx-auto p-3 text-lg">content:</div>
                        <div className="mx-auto p-3 text-lg leading-6">{postData.content}</div>
                    </div>
                
            </div>
            </>
            }
            <div className="text-center text-5xl my-5">Your posts</div>
            <div className="m-auto p-2 gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ">
                {usersPosts && usersPosts.sort((a, b) => b.id - a.id).map((obj, index) => (
                    <div className="mx-0 p-3 col-span-1 shadow-md shadow-blue-600 rounded-md flex flex-col items-center justify-center" key={`${obj.id}-${index}-`} >
                        <div className="mx-auto p-1 text-xl" > Title</div>
                        <div className="flex flex-row mx-auto flex-wrap items-center">

                            <div className="mx-auto p-3 text-xl shadow-md shadow-blue-500 rounded-md" > {obj.title}</div>
                            <IconButton onClick={(e) => handleDelete(e, obj.id)} >
                                <CancelIcon sx={{ m: 3, color: "red", fontSize: "100%" }} />
                            </IconButton>
                        </div>

                        <div className=" p-3" >published:{obj.published ? "true" : "false"}</div>
                        <div className=" p-3 text-lg" >
                            <SourceIcon sx={{ color: "red", mr: 2 }} />
                            content
                        </div>
                        <div className=" p-3 text-lg" >{obj.content}</div>
                        <div className=" p-3 text-sm font-bold" >{obj.date && convertDate(obj.date)}</div>
                        <div className=" p-3 text-lg" >
                            <CommentIcon sx={{ color: "blue", mr: 2 }} />
                            comments
                        </div>
                        {(obj && obj.answers && obj.answers.length) &&
                            obj.answers.map((ans, index) => (
                                <div key={index}>
                                    <div> {ans.answer}</div>
                                    <div className=" p-3 text-sm font-bold" >{ans.date && convertDate(ans.date)}</div>
                                </div>
                            ))
                        }
                        <div className="flex flex-col items-center justify-center">
                            <button className="text-black-500 bg-white-200 button.px-4.py-2.shadow-md shadow-blue-500 border px-5 border-blue-800 rounded-lg" onClick={(e) => handleToUpdate(e, obj)}>update</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default DisplayPage