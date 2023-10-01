import React from 'react'
import Image from "next/image";
import type { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props {
    props: React.ComponentProps<"button">;
    // image: React.ComponentProps<"img">;
    children: React.ReactNode;
    // image:ImageProps;

}

const ButtonImg = ({ children, props }: Props) => {
    return (
        <button className="px-3 py-1 rounded-full text-center border-1 border-blue-800 shadow-md shadow-blue-800 bg-blue-400 text-xs hover:bg-blue-800 hover:text-white hover:tracking-wide my-3 flex inline-flex justify-center items-center flex-nowrap  gap-2" {...props}  >
            {children}
        </button>
    )
}

export default ButtonImg