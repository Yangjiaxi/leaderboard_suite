import React, { memo, useRef, useState } from "react";

import {
    Box, Container, Fade, SpeedDial, SpeedDialAction, useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { DatasetOutlined, SwitchAccessShortcutAddOutlined, VerticalAlignTopOutlined } from "@mui/icons-material";
import Info from "./Info";
import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";

const BackgroundBox = styled(Box)(() => {
    const { palette: { backgroundColor } } = useTheme();
    return { backgroundColor, minHeight: "100vh" };
});

const MainFrame = memo(({
    header, detail, schemas, data,
}) => {
    const { title, titleCaption } = header;

    const { spacing, breakpoints } = useTheme();
    const isOneColumn = useMediaQuery(breakpoints.down("md"));

    const [open, setOpen] = useState(false);
    const topRef = useRef(null);
    const boardRef = useRef(null);

    const scrollTo = (ref) => () => {
        ref.current.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
    };

    return (
        <BackgroundBox display="flex" flexDirection="column">
            <div ref={topRef} />
            <Header title={title} titleCaption={titleCaption} />
            <Container maxWidth="xl" sx={{ flex: 1, p: 1 }}>
                <Grid spacing={2} container maxWidth="xl">
                    <Grid xs={12} md={4} item>
                        <Info detail={detail} />
                    </Grid>
                    <Grid xs={12} md={8} item>
                        <div ref={boardRef} />
                        <Board schemas={schemas} data={data} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />

            <Fade in={isOneColumn}>
                <SpeedDial
                    ariaLabel="SpeedDial"
                    sx={{ position: "fixed", right: spacing(3), bottom: spacing(8) }}
                    icon={<SwitchAccessShortcutAddOutlined />}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <SpeedDialAction icon={<DatasetOutlined />} tooltipTitle="Leaderboard" tooltipOpen onClick={scrollTo(boardRef)} />
                    <SpeedDialAction icon={<VerticalAlignTopOutlined />} tooltipTitle="Top" tooltipOpen onClick={scrollTo(topRef)} />
                </SpeedDial>
            </Fade>
        </BackgroundBox>
    );
});

export default MainFrame;
