import * as React from 'react';
import { memo } from "react";
import Packer from "./Packer";

const App = memo(({ time }) => {
    return (
        <Packer time={time} />
    );
});

export default App;