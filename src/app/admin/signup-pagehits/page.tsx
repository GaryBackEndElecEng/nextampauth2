import React from 'react';
import prisma from "@_prisma/client";
import { getAccount } from "@context/ultils";
import type { mainGetSignup, mainPageHit } from "@context/type";
import SignUpPageHits from "@component/admin/SignUpPageHits";

type mainCreds = {
    name: string,
    email: string
}
const name = process.env.NEXT_PUBLIC_adminuser
const email = process.env.NEXT_PUBLIC_adminemail


const SignupHits = async () => {
    const account = await getAccount();
    const check: boolean = (account?.data?.email === email && account?.data?.name === name) ? true : false;

    return (
        <div className="lg:mx-auto lg:container bg-[whitesmoke] p-3">
            {check &&
                <SignUpPageHits />
            }
        </div>
    )
}

export default SignupHits