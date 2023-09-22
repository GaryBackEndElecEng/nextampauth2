"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { userType, msgType, userAccountType, registerType } from "@component/context/type";
import { GeneralContext } from "@component/context/GeneralContextProvider";
import httpUrl from '@component/context/httpUrl';
import { ArrowFunction, FunctionDeclaration } from 'typescript';

type mainRegisterType = {
    genHash: (pswd: string) => Promise<string>
}
function textPswd(pswd: string): boolean {
    const pswdTest = /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;
    if (pswdTest.test(pswd)) return true
    return false

}

const Register = ({ genHash }: mainRegisterType) => {
    const url = httpUrl();
    const { setAccount, session, status } = React.useContext(GeneralContext);
    const staticImage = process.env.NEXT_PUBLIC_aws;
    const logo = `${staticImage}/logo.png`;
    const router = useRouter();
    const [data, setData] = React.useState<registerType>({} as registerType);
    const [msg, setMsg] = React.useState<msgType | null>(null);
    const [showPass, setShowPass] = React.useState<boolean>(false);
    const [pswd, setPswd] = React.useState<string>("");
    const changePasswd = () => {
        setShowPass(true);
        setTimeout(() => { setShowPass(false) }, 2000);
    }


    React.useMemo(async () => {
        if (textPswd(pswd)) {
            let tempPswd: string | null = await genHash(pswd);
            if (tempPswd) {
                setData({ ...data, password: tempPswd, emailVerified: new Date() });
                setMsg({ loaded: true, msg: "Thank you for joining" })
            }
        } else {
            setMsg({ loaded: false, msg: "password is at least 5 letters long with one uppercase and one !,^,?,,special character" })
        }
    }, [pswd]);




    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sendRegister = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json,XSRF-TOKEN",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            const res = await fetch(`api/auth/register`, options);
            if (!res.ok) {
                if ((res.status === 400 || res.status === 500) && await res.json()) {
                    let message: { message: string } = await res.json();
                    setMsg({ loaded: false, msg: message.message });
                    return
                } else {
                    throw new Error(" something went wrong => did not send msg from register page");
                }
            }

            const body: userType = await res.json();
            const temp: userAccountType = {
                loaded: true,
                data: {
                    id: body.id,
                    name: body?.name,
                    email: body?.email,
                    image: body?.image,
                    status: "authenticated"
                }
            }
            setAccount(temp);
            localStorage.setItem("account", JSON.stringify(temp))
            setMsg({ loaded: true, msg: `${body.name} have been registered` });
            setData({ id: "", name: "", email: "", password: "" })
            router.push("/api/auth/signin");
        }
        if (data.name && data.email && data.password) {
            sendRegister();

        }
    }


    return (
        <div>
            <div className="flex flex-col  w-full  justify-center w-sm py-12 lg:px-8 border border-black rounded-lg bg-black text-white">
                <div className="sm:mx-auto px-8 sm:max-w-sm">
                    <Image width={155} height={155} src={logo} alt="www" className="mx-auto h-10 w-auto shadow-lg shadow-blue rounded-full" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-grey-900">Register</h2>
                    <h3 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-grey-900">Thank you for being with us</h3>

                </div>
                {msg && !msg.loaded ?
                    <div className="flex flex-col px-1 my-1 max-w-xs ">
                        <p className=" text-center text-red px-1 text-xs">{msg && msg.msg}</p>
                    </div>
                    :
                    <div className="flex flex-col px-auto my-3 min-w-sm ">
                        <p className="text-lg text-center text-blue">{msg && msg.msg}</p>
                    </div>
                }
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e) => registerUser(e)} className="w-full flex flex-col items-center  p-3 rounded-lg bg-slate_blue text-white shadow-md shadow-slate_blue" >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6">name</label>
                            <div className="mt-2  flex flex-col justify-center my-2 rounded-lg">
                                <input type="text" className="mt-2 shadow shadow-blue bg-white text-black"
                                    name="name"
                                    value={data && data.name ? data.name : ""}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required

                                />
                            </div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6">email</label>
                            <div className="mt-2 mt-2   my-2 rounded-lg flex flex-col justify-center">
                                <input type="text" className="mt-2 shadow shadow-blue bg-white text-black"
                                    name="email"
                                    value={data && data.email ? data.email : ""}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    required

                                />
                            </div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6">password</label>
                            <div className="mt-2 mt-2   my-2 rounded-lg flex flex-col justify-center">
                                <input className="mt-2 shadow shadow-blue bg-white text-black"
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    value={pswd}
                                    required
                                    onChange={(e) => setPswd(e.target.value)}

                                />
                                <button className="text-center text-white bg-blue shadow-md shadow-blue rounded-md hover:text-leading-3" onClick={changePasswd}>show password</button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button type="submit" className="flex flex-col w-full justify-center rounded-md bg-indigo-600 px-4 py-1 5 text-sm font-bold text-center shadow-md shadow-white">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register