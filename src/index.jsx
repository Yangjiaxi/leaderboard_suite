
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import App from "./pages/App";
import theme from "./templates/theme";

import detail from "./templates/info.md";
import header from "./templates/header";
import tableSchema from "./templates/board";

console.log(theme);

const data = [
    { "name": "SOTA", 'average': 1.2, 'mip-photochat-f1': 1.2, 'mip-mmdialog-f1': 1.2, 't2i-photochat-r1': 1.2, 't2i-mmdialog-r1': 1.2, 'i2t-imagechat-r1': 1.2, 'i2t-visdial-mrr': 1.2, 'mdst-simmc-intent-f1': 1.2, 'mdst-mmconv-a.c': 1.2, 'mrg-simmc-bleu': 1.2, 'mrg-mmconv-inform': 1.2 },
    { "name": "Prev SOTA", 'average': 2.4, 'mip-photochat-f1': 2.4, 'mip-mmdialog-f1': 2.4, 't2i-photochat-r1': 2.4, 't2i-mmdialog-r1': 2.4, 'i2t-imagechat-r1': 2.4, 'i2t-visdial-mrr': 2.4, 'mdst-simmc-intent-f1': 2.4, 'mdst-mmconv-a.c': 2.4, 'mrg-simmc-bleu': 2.4, 'mrg-mmconv-inform': 2.4 },
];

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App header={header} detail={detail} schema={tableSchema} data={data} />
    </ThemeProvider>
);
