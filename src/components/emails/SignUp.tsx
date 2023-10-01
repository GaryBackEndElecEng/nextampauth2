"use client";
import React from 'react';
import { GeneralContext } from "@context/GeneralContextProvider";
import { FormControl, Input, FormLabel } from "@mui/material";
import styles from "@component/emails/signup.module.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";



const SignUp = () => {
    const { signUpEmail, setSignUpEmail, setMsg, msg, setSignup, signup, setClose } = React.useContext(GeneralContext);



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
        setMsg({ loaded: true, msg: body.message });
        setSignup(false);
        setClose(false);

    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSignUpEmail({
        ...signUpEmail,
        [e.target.name]: e.target.value
    });
    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        setClose(true);
        setSignup(false);
    }

    return (
        <>
            {signup ?
                <div className={`${styles.masterSignup} absolute `}>

                    <div className="relative m-auto flex flex-col items-center justify-center w-full z-1000">
                        <h2 className="text-primary-700 text-center prose mb-3 underline underline-offset-8">Masterultils</h2>
                        <h3 className="text-primary-700 text-center prose mb-3 underline underline-offset-8">We	&#8216;ll keep you in the loop!</h3>
                        <IconButton onClick={(e) => handleClose(e)}
                            className={`${styles.cancelIcon} absolute `}
                        >
                            <CancelIcon sx={{ color: "red" }} />
                        </IconButton>
                        <form action="" onSubmit={(e) => handleSubmit(e)}
                            className="flex flex-col items-center gap-0 p-3 z-2 shadow shadow-blue-300 rounded-lg"
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

                </div>
                : <React.Fragment></React.Fragment>

            }
        </>
    )
}

export default SignUp