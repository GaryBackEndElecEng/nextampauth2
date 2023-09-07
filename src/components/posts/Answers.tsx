"use client"
import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import type {answerType} from "@context/type";
import { convertDate } from "@component/ultilities";

type answersType={
    ans:answerType,
    userInfo: (id: string) => React.JSX.Element | undefined
}
const Answers = ({ans,userInfo}:answersType) => {
    if(ans){
  return (
    <>
    <CommentIcon sx={{ color: "blue" }} />
    <div>{ans.answer}</div>
    {userInfo(ans.userId)}
    <div className="text-sm text-center">Date</div>
    <p className="text-center my-2 text-md">
        {ans.date && convertDate(ans.date)}
    </p>
    </>
  )
    }else{return(<></>)}
}

export default Answers