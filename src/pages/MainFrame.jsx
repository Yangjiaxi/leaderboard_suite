import React, { memo } from "react";

import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Info from "./Info";
import Header from "./Header";
import Board from "./Board";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Footer from "./Footer";

const BackgroundBox = styled(Box)(() => {
    const { palette: { backgroundColor } } = useTheme();
    return { backgroundColor: backgroundColor, minHeight: "100vh" };
});

const MainFrame = memo(({ header, detail, schema, data }) => {
    const { title, titleCaption } = header;
    return (
        <BackgroundBox display="flex" flexDirection="column">
            <Header title={title} titleCaption={titleCaption} />

            <Container maxWidth="xl" sx={{ flex: 1 }}>
                <Grid spacing={1} container maxWidth="xl">
                    <Grid xs={12} md={4} item>
                        <Info detail={detail} />
                    </Grid>
                    <Grid xs={12} md={8} item>
                        <Board schema={schema} data={data} />
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </BackgroundBox>
    );
});

export default MainFrame;