import styled from "@emotion/styled";
import {
    Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography,
} from "@mui/material";
import React, { Fragment, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "@emotion/react";
import { Anchor } from "./Utils";

const BoardContainer = styled(Box)(() => ({ width: "100%" }));
const BoardPaper = styled(Paper)(() => {
    const { spacing } = useTheme();
    return {
        marginBottom: spacing(3),
        padding: spacing(2),
    };
});

const TableCellNoWrap = styled(TableCell)({ whiteSpace: "nowrap" });

const makeHeaderCell = ({ content, colSpan, rowSpan }, index) => (
    <TableCellNoWrap key={index} colSpan={colSpan} rowSpan={rowSpan} align="center">
        <Typography fontWeight="bold">{content}</Typography>
    </TableCellNoWrap>
);

const makeHeaderRow = (headerRowSchema, index) => (
    <TableRow key={index}>
        {headerRowSchema.map((headerCellSchema, indexCell) => makeHeaderCell(headerCellSchema, indexCell))}
    </TableRow>
);

const makeHeader = (headerSchema) => (
    <TableHead>
        {headerSchema.map((headerRow, index) => makeHeaderRow(headerRow, index))}
    </TableHead>
);

const renderFontDecorator = (text, config) => {
    let content = text;
    if (config.isItalic) content = <i>{content}</i>;
    if (config.isBold) content = <b>{content}</b>;
    if (config.isMono) content = <tt>{content}</tt>;

    return content;
};

const renderCellContent = (cellConfig, cellData) => {
    const textWithDecorator = renderFontDecorator(cellData, cellConfig);
    if (cellConfig.type === "plain") return <Typography>{textWithDecorator}</Typography>;
    if (cellConfig.type === "badge") return <Chip label={textWithDecorator} variant="filled" size="small" />;
    if (cellConfig.type === "link") return <Anchor to={cellData}><IconButton><OpenInNewIcon /></IconButton></Anchor>;
    // console.log('Uncaught: ', cellConfig.type);
    return <> cellData</>;
};

const renderDataCell = (cellSchema, fullDataDict, index) => {
    const cellContent = cellSchema
        .filter(({ keyName }) => fullDataDict.hasOwnProperty(keyName))
        .map(({ keyName, config }) => renderCellContent(config, fullDataDict[keyName]));
    return <TableCellNoWrap key={index} align="center">{cellContent.map((e, idx) => <Fragment key={idx}>{e}</Fragment>)}</TableCellNoWrap>;
};

const makeDataRow = (cellSchemas, line, index) => (
    <TableRow key={index}>
        {cellSchemas.map((cellSchema, cellIndex) => renderDataCell(cellSchema, line, cellIndex))}
    </TableRow>
);

const makeData = (cellSchemas, data) => (
    <TableBody>
        {data.map((line, index) => makeDataRow(cellSchemas, line, index))}
    </TableBody>
);

const preprocessHeader = (oriHeader) => {
    let maxRowSpan = 0;
    for (const headerRow of oriHeader) {
        for (const headerCell of headerRow) {
            maxRowSpan = Math.max(maxRowSpan, headerCell.rowSpan);
        }
    }

    const newHeader = [
        [{ content: "Index", colSpan: 1, rowSpan: maxRowSpan }, ...oriHeader[0]],
        ...oriHeader.slice(1),
    ];

    return newHeader;
};

const preprocessSchema = (indexSchema, contentSchema) => [indexSchema, ...contentSchema];

const makeBoard = (schema, data, index) => {
    const tableName = schema.name;
    const { sortKey } = schema;
    const { scopeName } = schema;
    const header = preprocessHeader(schema.header);
    const dataSchema = preprocessSchema(schema.indexSchema, schema.contentSchema);

    const tableHeader = makeHeader(header);

    const matchedData = data.filter(({ scope }) => scope === scopeName);
    const sorted = [...matchedData].sort((a, b) => b[sortKey] - a[sortKey]);

    const dataWithIdx = [];
    let counter = 1;
    for (const e of sorted) {
        if ("__skip_index" in e && e.__skip_index) {
            dataWithIdx.push(e);
        } else {
            dataWithIdx.push({ ...e, __index: counter });
            counter += 1;
        }
    }

    const tableBody = makeData(dataSchema, dataWithIdx);

    return (
        <BoardPaper key={index} elevation={2}>
            <TableContainer>
                <Toolbar><Typography variant="h5" fontWeight="bold" display="block" style={{ whiteSpace: "nowrap" }}>{tableName}</Typography></Toolbar>
                <Table size="small">
                    {tableHeader}
                    {tableBody}
                </Table>
            </TableContainer>
        </BoardPaper>
    );
};

const Board = memo(({ schemas, data }) => <BoardContainer>{schemas.map((schema, index) => makeBoard(schema, data, index))}</BoardContainer>);

export default Board;
