import * as React from "react";
import { memo } from "react";
import MainFrame from "./MainFrame";

const App = memo(({
    header, detail, schemas, data,
}) => <MainFrame header={header} detail={detail} schemas={schemas} data={data} />);

export default App;
