import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';


const SsrApp = (cache, theme, header, detail, schema, data) => (
    <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
            <App header={header} detail={detail} schema={schema} data={data} />
        </ThemeProvider>
    </CacheProvider>
);

export default SsrApp;