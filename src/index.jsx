
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import App from "./pages/App";
import theme from "./templates/theme";

import detail from "./templates/info.md";
import header from "./templates/header";
import tableSchema from "./templates/board";

// const data = [
//     { "name": "SOTA", 'average': 1.2, 'mip-photochat-f1': 1.2, 'mip-mmdialog-f1': 1.2, 't2i-photochat-r1': 1.2, 't2i-mmdialog-r1': 1.2, 'i2t-imagechat-r1': 1.2, 'i2t-visdial-mrr': 1.2, 'mdst-simmc-intent-f1': 1.2, 'mdst-mmconv-a.c': 1.2, 'mrg-simmc-bleu': 1.2, 'mrg-mmconv-inform': 1.2 },
//     { "name": "Prev SOTA", 'average': 2.4, 'mip-photochat-f1': 2.4, 'mip-mmdialog-f1': 2.4, 't2i-photochat-r1': 2.4, 't2i-mmdialog-r1': 2.4, 'i2t-imagechat-r1': 2.4, 'i2t-visdial-mrr': 2.4, 'mdst-simmc-intent-f1': 2.4, 'mdst-mmconv-a.c': 2.4, 'mrg-simmc-bleu': 2.4, 'mrg-mmconv-inform': 2.4 },
// ];

const data = [
    { "name": "Human Performance", "creator": "Data Engineers + DB Students", "test_acc": "Testing" },
    { "name": "Codex + DB schema + Knowledge Concat + Value Sampling", "creator": "OpenAI", "time": "2021/09/30", "size": "175B", "params": "0", "dev_acc": "21.81", "test_acc": "TBD" },
    { "name": "Codex + DB schema + Knowledge Concat", "creator": "OpenAI", "time": "2021/10/05", "repo": "https://www.openai.com/", "size": "175B", "params": "0", "dev_acc": "17.80", "test_acc": "TBD" },
    { "name": "Codex + DB schema", "creator": "OpenAI", "time": "2021/10/11", "size": "175B", "params": "0", "dev_acc": "10.65", "test_acc": "TBD" },
    { "name": "T5-3B", "creator": "Google", "time": "2020/05/22", "repo": "https://www.google.com/", "size": "3B", "params": "3B", "dev_acc": "5.45", "test_acc": "TBD" },
    { "name": "T5-Large", "creator": "Google", "time": "2020/05/10", "repo": "https://www.baidu.com/", "size": "800M", "params": "800M", "dev_acc": "3.72", "test_acc": "TBD" }

];


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App header={header} detail={detail} schema={tableSchema} data={data} />
    </ThemeProvider>
);
