import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const HeaderContainer = styled(Box)(() => {
    const { palette: { primary: { main } } } = useTheme();
    return {
        width: "100%",
        height: "200px",
        padding: "20px 0",
        backgroundColor: main
    };
});

const HeaderText = styled(Typography)(() => {
    const { palette: { secondary: { main } } } = useTheme();
    return { color: main };
});

const Header = memo(({ title, titleCaption }) => {
    return (
        <HeaderContainer display="flex" flexDirection="column" justifyContent="center">
            <HeaderText variant="h1" align="center" fontWeight="bold">{title}</HeaderText>
            <HeaderText variant="body1" align="center">{titleCaption}</HeaderText>
        </HeaderContainer >
    );
});

export default Header;