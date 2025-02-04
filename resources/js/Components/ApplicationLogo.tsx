import React from "react";

export default function ApplicationLogo(
    props: React.ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <img
            {...props}
            src="/logo.png" // Use the root-relative path
            alt="Application Logo"
        />
    );
}
