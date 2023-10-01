import React from "react";
import { MDXProvider } from "@mdx-js/react";


type providerType = {
    children?: React.ReactNode
}
const MDXProviders = ({ children }: providerType) => {
    return (
        <MDXProvider>
            {children}
        </MDXProvider>
    )
}
export default MDXProviders