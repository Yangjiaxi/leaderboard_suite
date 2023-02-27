import React, { memo } from "react";

import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Info from "./Info";
import Header from "./Header";
import Board from "./Board";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const BackgroundBox = styled(Box)(() => {
    const { palette: { backgroundColor } } = useTheme();
    return {
        backgroundColor: backgroundColor
    };

});

const MainFrame = memo(({ header, detail, schema, data }) => {
    // header={header} detail={detail} schema={schema} data={data} 
    const { title, titleCaption } = header;
    // console.log(detail);
    return (
        <BackgroundBox>
            <Header title={title} titleCaption={titleCaption} />
            <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Info detail={detail} />
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Board schema={schema} data={data} />
                    </Grid>
                </Grid>
            </Container>
        </BackgroundBox>
    );
});

export default MainFrame;