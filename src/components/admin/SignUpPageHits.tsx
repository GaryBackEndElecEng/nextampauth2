"use client";
import React from 'react';
import type { mainGetSignup, mainPageHit } from "@context/type";
import Link from "next/link";
import { ThemeContext } from '../context/ThemeContext';
import { GeneralContext } from "@context/GeneralContextProvider";
import { convert } from '../../pages/api/posts/posts';

const name = process.env.NEXT_PUBLIC_adminuser
const email = process.env.NEXT_PUBLIC_adminemail

function convertDate(date: string): string | null {
    if (date && typeof (date) === "string") {
        return date.split("T")[0]
    } else return null
}
function OrderByArray(values: any[], orderType: any) {

    return values.sort((a, b) => {
        if (a[orderType] < b[orderType]) {
            return -1;
        }

        if (a[orderType] > b[orderType]) {
            return 1;
        }

        return 0
    });
}
type mainSignupPage = {
    signups: mainGetSignup[] | undefined,
    pagehits: mainPageHit[] | undefined
}

const SignUpPageHits = () => {
    const { msg, setMsg } = React.useContext(GeneralContext);
    const { theme } = React.useContext(ThemeContext);
    const [signups, setSignups] = React.useState<mainGetSignup[] | null>(null);
    const [pagehits, setPagehits] = React.useState<mainPageHit[] | null>(null);


    React.useEffect(() => {
        const getPageHits = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name: name, email: email })
            }

            const res = await fetch("/api/pagehits", options);
            if (!res.ok) {
                setMsg({ loaded: false, msg: "did not get pagehits" })
            }
            const body = await res.json();
            setPagehits(body);

        }
        if (!pagehits) {
            getPageHits();
        }
    }, []);

    React.useEffect(() => {
        const getSignups = async () => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name: name, email: email })
            }

            const res = await fetch("/api/signups", options);
            if (!res.ok) {
                setMsg({ loaded: false, msg: "did not get signups" })
            }
            const body = await res.json();
            setSignups(body);


        }
        if (pagehits) {
            getSignups();
        }
    }, [pagehits, setSignups, setMsg]);

    return (
        <div className={`${theme}  lg:mx-auto lg:container bg-white dark:bg-black dark:text-white text-black flex flex-col items-center justify-center `}>
            <Link href={"/admin"}
                className=" flex flex-row justify-center shadow-md shadow-blue py-1 rounded-full border border-blue px-3 m-auto text-center w-1/4 mt-20 mb-10 "
            >
                <h3 className="text-lg text-center">return</h3>
            </Link>
            <h3 className="text-center mb-4 underline underline-offset-5 font-bold">Sign Up</h3>
            <div className="lg:mx-auto grid grid-cols-2 sm:grid-cols-3  gap-4">
                {signups ?
                    (signups.map((sign, index) => (
                        <div className="flex flex-col p-2 m-auto items-center justify-center shadow shadow-blue p-2 border border-blue rounded-lg" key={index}>
                            <h2 className="text-center text-lg my-2 underline underline-offset-7">{sign.name}</h2>
                            <h2 className="text-center text-lg">{sign.email}</h2>
                            {convertDate(sign.date as string) && <small className="text-center text-md">{convertDate(sign.date as string)}</small>}
                        </div>
                    ))

                    )
                    :
                    (
                        <div className="text-center grid-span-4 my-4 p-20">no signups</div>
                    )
                }
            </div>
            <h3 className="text-center mb-4 underline underline-offset-5 font-bold">page hits</h3>
            <div className="lg:mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {pagehits ?
                    (pagehits.map((hit, index) => (
                        <div className="flex flex-col items-center justify-center shadow shadow-blue p-2 border border-blue rounded-lg " key={index}>
                            <div className="flex flex-row p-2 m-auto items-center justify-center gap-2 flex-wrap" >
                                <h2 className="text-center text-lg my-2 underline underline-offset-7">{hit.page}</h2>
                                <h2 className="text-center text-lg font-bold">{hit.count}</h2>

                            </div>
                            <small className="text-center text-md">{convertDate(hit.date as string) && convertDate(hit.date as string)}</small>
                        </div>
                    ))

                    )
                    :
                    (
                        <div className="text-center grid-span-4 my-4 p-20">no signups</div>
                    )
                }
            </div>
            {msg.loaded ? (
                <div className="text-center text-blue font-bold text-lg">{msg.msg}</div>
            ) : (
                <div className="text-center text-red font-bold text-lg">{msg.msg}</div>
            )}
        </div>
    )
}

export default SignUpPageHits