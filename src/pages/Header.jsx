import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { pageConfig } from "./Utils";

const HeaderContainer = styled(Box)(() => {
    const { palette: { primary: { main } }, spacing } = useTheme();
    return {
        width: "100%",
        height: pageConfig.headerHeight,
        padding: `0 ${spacing(2)}`,
        marginBottom: spacing(2),
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