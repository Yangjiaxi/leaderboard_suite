import React, { memo } from "react";

import { Container } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2";
import Info from "./Info";
import Header from "./Header";
import Board from "./Board";

const MainFrame = memo(() => {
    return (
        <div style={{ backgroundColor: "#fafafa" }}>
            <Header />
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Info />
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Board />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
});

export default MainFrame;