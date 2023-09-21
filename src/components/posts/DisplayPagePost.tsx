import React from 'react'
import Image from "next/image";
import { DataType, userType, PostDataType } from "@component/context/type";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SourceIcon from '@mui/icons-material/Source';
import { GeneralContext } from "@component/context/GeneralContextProvider";
import { convertDate } from "@component/ultilities";

type mainDisplayPageType = {
    obj: PostDataType,
    handleDelete: (e: React.MouseEvent, id: number) => void,
    handleToUpdate: (e: React.MouseEvent, obj: PostDataType) => void
}
const DisplayPagePost = ({ obj, handleDelete, handleToUpdate }: mainDisplayPageType) => {
    return (
        <React.Fragment >
            <div className="mx-auto p-1 text-xl" > Title</div>
            <div className="flex flex-row mx-auto flex-wrap items-center">

                <div className="mx-auto p-3 text-xl shadow-md shadow-blue-500 rounded-md" > {obj.title}</div>
                <IconButton onClick={(e) => handleDelete(e, obj.id!)} >
                    <CancelIcon sx={{ m: 3, color: "red", fontSize: "100%" }} />
                </IconButton>
            </div>
            {obj.imageKey &&
                <Image src={obj.imageKey} width={300} height={300} alt="www.masterconnect.ca"
                    className="aspect-video" />
            }
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
        </React.Fragment>
    )
}

export default DisplayPagePost