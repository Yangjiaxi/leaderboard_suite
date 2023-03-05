import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box, Container, Grid, Typography, useMediaQuery,
} from "@mui/material";
import React, { memo } from "react";
import { convertToBuildPath, pageConfig } from "./Utils";

const HeaderContainer = styled(Box)(() => {
    const { palette: { primary: { main } }, spacing } = useTheme();
    return {
        width: "100%",
        padding: `${spacing(2)} ${spacing(2)} 100px ${spacing(2)}`,
        marginBottom: spacing(2),
        backgroundColor: main,
    };
});

const HeaderText = styled(Typography)(() => {
    const { palette: { secondary: { main } } } = useTheme();
    return { color: main };
});

const Header = memo(({ title, titleCaption, logoList }) => {
    const { breakpoints } = useTheme();
    const isLarge = useMediaQuery(breakpoints.up("lg"));
    const imgSize = isLarge ? "50px" : "30px";
    const paddingBottom = isLarge ? "75px" : "50px";

    return (
        <HeaderContainer display="flex" flexDirection="column" justifyContent="center" style={{ paddingBottom }}>
            <Container maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {logoList.map((imgUrl, index) => <Grid item key={index}><img src={convertToBuildPath("/build", imgUrl)} alt={`Logo-${index}`} style={{ maxHeight: imgSize, minHeight: imgSize }} /></Grid>)}
                </Grid>
                <Grid container display="flex" flexDirection="column" justifyContent="center">
                    <HeaderText variant="h1" align="center" fontWeight="bold">{title}</HeaderText>
                    <HeaderText variant="h6" align="center">{titleCaption}</HeaderText>
                </Grid>
            </Container>
        </HeaderContainer>
    );
});

export default Header;
