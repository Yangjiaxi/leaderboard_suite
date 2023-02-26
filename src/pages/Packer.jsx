import { CssBaseline } from "@mui/material";
import React, { memo } from "react";
import MainFrame from "./MainFrame";

const Packer = memo(({ time }) => {
    return (
        <>
            <CssBaseline />
            <MainFrame time={time} />
        </>
    )
});

export default Packer;