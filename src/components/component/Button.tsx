import React from "react";

interface Props {
    border?: string;
    color?: string;
    children?: React.ReactNode;
    height?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    radius?: string
    width?: string;
}

const Button: React.FC<Props> = ({
    border,
    color,
    children,
    height,
    onClick,
    radius,
    width
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                height,
                width
            }}
            className="px-3 py-1 rounded-full text-center border-1 border-blue-800 shadow-md shadow-blue-800 bg-blue-400 text-sm hover:bg-blue-800 hover:text-white hover:tracking-wide my-3"
        >
            {children}
        </button>
    );
}

export default Button;