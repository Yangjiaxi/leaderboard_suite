import { Link } from "@mui/material";
import React, { memo } from "react";

const pageConfig = {
    headerHeight: "250px",
    footerHeight: "100px",
};

const Anchor = memo(({ to, children }) => (
    <Link
        href={to}
        target="_blank"
        rel="noopener noreferrer"
    >
        {children}
    </Link>
));

const isValidHttpUrl = (uri) => {
    let url;
    try {
        url = new URL(uri);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};

const convertToBuildPath = (prefix, uri) => {
    if (!isValidHttpUrl(uri)) return `${prefix}/${uri}`;
    return uri;
};

export { Anchor, pageConfig, convertToBuildPath };
