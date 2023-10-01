import React from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { IconButton } from "@mui/material";
import type { IconButtonProps } from "@mui/material";
import { icons } from '../context/Icons';


export function ImageFunct({ src, width, height, alt }: ImageProps) {

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    )
}

interface Props {
    children?: React.ReactNode;
    height: number | `${number}` | undefined;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    color: string;
    width: number | `${number}` | undefined;
    src: string | StaticImport;
    type: 'small' | 'medium' | 'large' | string;
}

const ButtonImg2: React.FC<Props & IconButtonProps & ImageProps> = ({
    color,
    children,
    height,
    onClick,
    width,
    src
}) => {
    return (
        <IconButton
            onClick={onClick}
            style={{
                backgroundColor: color,
            }}
            className="px-3 py-1 rounded-full text-center border-1 border-blue-800 shadow-md shadow-blue-800 bg-blue-400 text-sm hover:bg-blue-800 hover:text-white hover:tracking-wide my-3 flex flex-row flex-wrap gap-2"
            color={color}
        >
            <ImageFunct src={src} width={width} height={height} alt={"www.masterconnect.ca"} />
            {children}
        </IconButton>
    );
}

export default ButtonImg2;