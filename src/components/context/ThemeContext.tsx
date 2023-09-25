"use client"
import React from 'react';
import type { } from "@context/type";

type themeContextType = {
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>,
    theme: "dark" | "light"
}
type ThemeContextProviderType = {
    children: React.ReactNode,

}
export const ThemeContext = React.createContext<themeContextType>({} as themeContextType);
export default function ThemeContextProvider({
    children
}: ThemeContextProviderType) {
    const [theme, setTheme] = React.useState<"dark" | "light">("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

