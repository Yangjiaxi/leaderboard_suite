import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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