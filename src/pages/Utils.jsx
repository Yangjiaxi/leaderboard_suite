import { Link } from "@mui/material";
import React, { memo } from "react";

const pageConfig = {
    headerHeight: "250px",
    footerHeight: "100px",
};

const Anchor = memo(({ to, children }) => (
    <Link
        href={to}
        target='_blank'
        rel='noopener noreferrer'
    >
        {children}
    </Link>
));


export { Anchor, pageConfig };