"use client";
import React from 'react';
import { GeneralContext } from "@context/GeneralContextProvider";
import { FormControl, Input, FormLabel } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";

type mainSignIn = {
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    setHide: React.Dispatch<React.SetStateAction<boolean>>,
    setExpand: React.Dispatch<React.SetStateAction<boolean>>,
    expand: boolean
}

const SignUp = ({ setClose, setHide, expand, setExpand }: mainSignIn) => {
    const { signUpEmail, setSignUpEmail, setMsg, msg } = React.useContext(GeneralContext);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }, body: JSON.stringify(signUpEmail)
        }
        const res = await fetch("/api/email", options);
        const body: any = await res.json();
        setTimeout(() => { setClose(true) }, 1200);
        if (!res.ok) {
            setMsg({ loaded: false, msg: `aw oh: ${body.message}` })
        }
        setSignUpEmail({ name: "", email: "" })
        setMsg({ loaded: true, msg: body.message })

    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSignUpEmail({
        ...signUpEmail,
        [e.target.name]: e.target.value
    })
    return (
        <div className={"flex flex-col items-center bg-white w-full p-1 sm:p-2 rounded-lg shadow shadow-blue border border-blue relative px-3"}>
            <IconButton onClick={() => setHide(true)}
                className="absolute top-0 right-0"
            >
                <CancelIcon sx={{ color: "red" }} />
            </IconButton>
            <form action="" onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col items-center gap-0 p-3"
            >
                <FormControl>
                    <FormLabel htmlFor="name" className="text-sm ">name</FormLabel>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={signUpEmail.name}
                        onChange={(e) => handleOnChange(e)}
                        className="border border-blue rounded-lg text-sm"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email" className="text-sm">email</FormLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={signUpEmail.email}
                        onChange={(e) => handleOnChange(e)}
                        className="border border-blue rounded-lg text-sm"
                    />
                </FormControl>
                <button className="shadow shadow-blue rounded-full px-3 py-1 border border-blue mt-2 text-sm" type="submit">signUp</button>
            </form>
            <div className="flex flex-col items-center text-center">
                {msg.loaded ?
                    <h5 className="text-blue m-auto">{msg.msg}</h5>
                    :
                    <h5 className="text-orange m-auto">{msg.msg}</h5>
                }
            </div>


        </div>
    )
}

export default SignUp