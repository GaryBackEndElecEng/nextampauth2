import React from 'react';
import type { msgType, answerType, userType, answerType_2, DataType, PostDataType } from "@component/context/type";
import type { Session } from "next-auth";
import { GeneralContext } from "@component/context/GeneralContextProvider";

type postAnsType = {
    postId: number | null,
    setSaved: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string | null,
    chela: string
}
const PostAnswer = ({ postId, setSaved, userId, chela }: postAnsType) => {
    const { setAllPosts, account, allPosts, setAllUsers, allUsers } = React.useContext(GeneralContext);
    const [answer, setAnswer] = React.useState<string | null>(null);
    const [dataAns, setDataAns] = React.useState<answerType_2 | null>(null);
    const [msg, setMsg] = React.useState<msgType>({ loaded: false, msg: "" });

    function addAnswerPostToAll(post_: PostDataType) {

        const remainingPs = allPosts.filter(
            post => (post.id !== post_.id)
        );

        setAllPosts([...remainingPs, post_]);


    };

    React.useMemo(() => {
        if (userId && postId && answer) {
            setDataAns({ answer: answer, userId: userId, postId: postId })
        }
    }, [userId, postId, answer]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const submitAns = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataAns)
            }
            const res = await fetch(`/api/posts/answer`, options);
            if (!res.ok) {
                setSaved(false);
                const body: { message: string } = await res.json();
                if (body.message) {
                    setMsg({ loaded: false, msg: body.message })
                } else {
                    const body: any = await res.json()
                    setMsg({ loaded: false, msg: JSON.stringify(body) });
                }
            }
            const postWithAns: PostDataType = await res.json();
            addAnswerPostToAll(postWithAns);
            setSaved(true);
            setMsg({ loaded: true, msg: `your ans was saved saved` });
        }
        if (dataAns) {
            submitAns();
        }
    };

    return (
        <div className={`z-0  w-full flex flex-col items-center justify-between font-mono  mt-3 mx-0 w-full ${chela} `}>

            <form className="m-auto flex flex-col items-center justify-center gap-4 shadow-md shadow-blue-600 rounded-lg w-full ">

                <div className="text-lg text-center">answer</div>
                <textarea
                    rows={4}
                    cols={20}
                    id="answer"
                    value={answer ? answer : ""}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="my-3 w-full bg-white text-black-500 shadow-md shadow-blue p-3"
                />

                <div className={`flex flex-col items-center justify-center gap-2`}>

                    <button className={`flex flex-col items-center justify-center px-5 p-2 border border-blue shadow shadow-blue rounded-lg ${chela}`} onClick={(e) => handleSubmit(e)}>
                        respond
                    </button>

                </div>

                {!msg.loaded &&
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-center text-sm text-red-600 font-bold">{msg.msg}</h3>
                    </div>
                }
            </form>

        </div>
    )
}

export default PostAnswer