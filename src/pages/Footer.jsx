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

const Footer = memo(() => (
    <FooterContainer display="flex" flexDirection="column" justifyContent="center">
        <Typography align="center" fontWeight="bold" color="primary">Designed with 💪 and ❤️ by LLMind.</Typography>
    </FooterContainer>
));

export default Footer;
