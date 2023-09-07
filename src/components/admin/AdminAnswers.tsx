import React from 'react'
import type { userType,showType,PostDataType} from "@component/context/type";
import {convertDate} from "@component/ultilities";


type mainAnswerType={
postId:number,
user:userType,
}
const AdminAnswers = ({postId,user}:mainAnswerType) => {
    const [show,setShow]=React.useState<showType>({loaded:false,id:null});

    const handleShow=(e:React.MouseEvent,id:number)=>{
        e.preventDefault();
        if(!show.loaded){
          setShow({loaded:true,id:id});
        }else{
          setShow({loaded:false,id:null})
        }
      }
  return (
    <div className="flex flex-col items-center">
        {
            (show.loaded && show.id===postId) ?
        <button className="text-center text-md px-3 py-1 rounded-lg shadow shadow-blue border border-blue text-orange" onClick={(e)=>handleShow(e,postId)}>hide</button>
        
        :
        <button className="text-center text-md px-3 py-1 rounded-lg shadow shadow-blue border text-red border-blue" onClick={(e)=>handleShow(e,postId)}>show</button>
        }
        <div className="text-center text-lg font-bold my-2">answer</div>
        {(show.loaded && show.id===postId) &&
        <div className="flex flex-col items-center">
        {user.answers && user.answers.map((ans,index)=>(
            <React.Fragment key={`${index}-${ans.id}`}>
            {ans.postId===postId &&
            <div className="m-0 p-0">
                <div className="text-lg my-2 font-bold">comment</div>
                <div className="text-md">{ans.answer}</div>
                <div className="text-md text-center">Date</div>
                <div className="text-center my-2">
                { ans.date && convertDate(ans.date)}
                </div>
            </div>
            }
            </React.Fragment>
        ))}
        </div>
        }
    </div>
  )
}

export default AdminAnswers