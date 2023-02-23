import { CssBaseline } from "@mui/material";
import React, { memo } from "react";
import MainFrame from "./MainFrame";

const Packer = memo(() => {
    return (
        <>
            <CssBaseline />
            <MainFrame />
        </>
    )
});

export default Packer;