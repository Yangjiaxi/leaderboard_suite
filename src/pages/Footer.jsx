import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { pageConfig } from "./Utils";

const FooterContainer = styled(Box)(() => {
    const { palette: { primary: { secondary } }, spacing } = useTheme();
    return {
        width: "100%",
        height: pageConfig.footerHeight,
        marginTop: spacing(2),
        backgroundColor: secondary,
    };
});

const HeaderText = styled(Typography)(() => {
    const { palette: { primary: { main } } } = useTheme();
    return { color: main };
});

const Footer = memo(() => {
    return (
        <FooterContainer display="flex" flexDirection="column" justifyContent="center">
            <HeaderText align="center" fontWeight="bold">Hello World</HeaderText>
        </FooterContainer>
    );
});

export default Footer;