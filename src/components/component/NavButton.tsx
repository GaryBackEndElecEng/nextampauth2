import React from "react";

interface Props extends React.ComponentProps<"button"> {
    color?: string;
    children?: React.ReactNode;
    height?: string;
    width?: string;
}

const NavButton: React.FC<Props> = ({
    color,
    children,
    height,
    onClick,
    width
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                height,
                width
            }}
            className="px-3 py-1 rounded-lg text-center border-1 border-blue-800 shadow-md shadow-blue-900 bg-blue-400 text-sm hover:bg-blue-600 hover:transition-all ease-in-out hover:tracking-wide text-black  my-1 dark:text-zinc-100 hover:shadow-white hover:text-green-300 hover:text-zinc-600"
        >
            {children}
        </button>
    );
}

export default NavButton;