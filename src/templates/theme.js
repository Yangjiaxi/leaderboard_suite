// import createTheme from '@mui/material/styles/createTheme.js';
// import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes.js";

import { createTheme, responsiveFontSizes } from "@mui/material/node/styles/index.js";


const theme = createTheme({
    palette: {
        primary: {
            main: "#55595F",
        },
        secondary: {
            main: "#ACE0DC"
        },
        // mode: "dark",
        backgroundColor: "#fafafa",
    },
    typography: {
        // fontSize: 12,
    },
});

export default responsiveFontSizes(theme);