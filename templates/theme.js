import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#55595F",
        },
        secondary: {
            main: "#ACE0DC",
        },
        // mode: "dark",
        backgroundColor: "#fafafa",
    },
    typography: {
        // fontSize: 12,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

export default responsiveFontSizes(theme);
