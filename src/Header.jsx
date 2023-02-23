
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const HeaderContainer = styled(Box)({
    width: "100%",
    height: "200px",
    padding: "20px 0",
    backgroundColor: "cornflowerblue",
});

const Header = memo(() => {
    return (
        <HeaderContainer display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h1" align="center">
                Header
            </Typography>
        </HeaderContainer>
    )
});

export default Header;