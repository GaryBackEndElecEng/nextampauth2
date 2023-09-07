
import React from 'react'
import type {  addCommentType,PostDataType } from "@component/context/type";
import Answers from "./Answers";

type showType = {
    loaded: boolean,
    id: number | null
}
type commentType={
    
    post:PostDataType,
    userInfo: (id: string) => React.JSX.Element | undefined
}

const Comments = ({post,userInfo}:commentType) => {
    const [show, setShow] = React.useState<showType>({ loaded: false, id: null });
    const [saved, setSaved] = React.useState<boolean>(false);

    

    const handleShowAns = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        if (show.loaded && show.id) {

            setShow({ loaded: false, id: null })
        } else {

            setShow({ loaded: true, id: id })
        }
    }
  return (
    <>
    {!!post.answers && post.answers.length>0 &&
         <div className="flex flex-col items-center my-3">
            {(show.loaded && show.id === post.id) ?
                <button className="flex flex-col items-center text-xl px-3 py-1 border border-blue rounded-md shadow-md shadow-blue dark:shadow-white"
                    onClick={(e) => handleShowAns(e, post.id)}
                >
                    <p className="text-red">hide</p>
                </button>

                :
                <button className="flex flex-col items-center text-xl px-3 py-1 border border-blue rounded-md shadow-md shadow-blue dark:shadow-white"
                    onClick={(e) => handleShowAns(e, post.id)}
                >
                    <p className="text-orange">see comments</p>
                </button>

            }
        </div>
    }
        {(show.loaded && show.id === post.id) &&
        <div className="mx-0 p-1 text-lg h-[26vh] overflow-y-scroll py-3" >
            
        {(post.answers && post.answers.length > 0 && post.content) &&
            post.answers.filter(ans => (ans.postId === post.id)).map((ans, index) => (

            <React.Fragment key={`${index}-${ans?.id}`}>
                <Answers 
                ans={ans}
                userInfo={userInfo}
                />
            </React.Fragment>
            ))
        }
        </div>
        }
    </>
  )
}

export default Comments