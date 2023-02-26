
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import App from "./pages/App";
import theme from "./templates/theme";

import detail from "./templates/info.md";
import header from "./templates/header";

console.log(theme);

const schema = [];
const data = [];

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App header={header} detail={detail} schema={schema} data={data} />
    </ThemeProvider>
);
