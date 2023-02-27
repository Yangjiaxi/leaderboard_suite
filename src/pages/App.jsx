import * as React from 'react';
import { memo } from "react";
import MainFrame from './MainFrame';

const App = memo(({ header, detail, schema, data }) => <MainFrame header={header} detail={detail} schema={schema} data={data} />);

export default App;