import styled from "@emotion/styled";
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { Fragment, memo } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Cell } from "../templates/makeBoard";
import { Anchor } from "./Utils";

const BoardContainer = styled(Box)(() => {
    return { width: "100%", };
});

const TableCellNoWrap = styled(TableCell)({ whiteSpace: "nowrap" });

const makeHeader = (headerSchema) =>
    <TableHead>
        {headerSchema.map((headerRow, index) => makeHeaderRow(headerRow, index))}
    </TableHead>;

const makeHeaderRow = (headerRowSchema, index) => {
    return <TableRow key={index}>
        {headerRowSchema.map((headerCellSchema, indexCell) => makeHeaderCell(headerCellSchema, indexCell))}
    </TableRow>;
};

const makeHeaderCell = ({ content, colSpan, rowSpan }, index) =>
    <TableCellNoWrap key={index} colSpan={colSpan} rowSpan={rowSpan} align="center">
        <Typography fontWeight="bold">{content}</Typography>
    </TableCellNoWrap>;

const makeData = (cellSchemas, data) => {
    return <TableBody>
        {data.map((line, index) => makeDataRow(cellSchemas, line, index))}
    </TableBody>;
};

const renderFontDecorator = (text, config) => {
    if (config.isItalic) return <i>{text}</i>;
    if (config.isBold) return <b>{text}</b>;
    if (config.isMono) return <tt>{text}</tt>;
    return text;
};

const renderCellContent = (cellConfig, cellData) => {
    const textWithDecorator = renderFontDecorator(cellData, cellConfig);
    if (cellConfig.type === "plain") return <Typography>{textWithDecorator}</Typography>;
    if (cellConfig.type === "badge") return <Chip label={textWithDecorator} variant="outlined" size="small" />;
    if (cellConfig.type === "link") return <Anchor to={cellData}><OpenInNewIcon /></Anchor>;
    else console.log(cellConfig.type);
};

const renderDataCell = (cellSchema, fullDataDict, index) => {
    const cellContent = cellSchema
        .filter(({ keyName }) => fullDataDict.hasOwnProperty(keyName))
        .map(({ keyName, config }) => renderCellContent(config, fullDataDict[keyName]));
    return <TableCellNoWrap key={index} align="center">{cellContent.map((e, idx) => <Fragment key={idx}>{e}</Fragment>)}</TableCellNoWrap>;
};

const makeDataRow = (cellSchemas, line, index) => {
    return <TableRow key={index}>
        {cellSchemas.map((cellSchema, cellIndex) => renderDataCell(cellSchema, line, cellIndex))}
    </TableRow>;
};

const preprocessHeader = (oriHeader) => {
    let maxRowSpan = 0;
    for (const headerRow of oriHeader) {
        for (const headerCell of headerRow) {
            maxRowSpan = Math.max(maxRowSpan, headerCell.rowSpan);
        }
    }
    let withIndexHeader = oriHeader;
    withIndexHeader[0].unshift({ content: 'Index', colSpan: 1, rowSpan: maxRowSpan });
    return withIndexHeader;
};

const preprocessSchema = (oriSchema) => [[Cell.plain("index")], ...oriSchema];

const Board = memo(({ schema, data }) => {
    const sortKey = schema.sortKey;
    const header = preprocessHeader(schema.header);
    const dataSchema = preprocessSchema(schema.contentSchema);

    const tableHeader = makeHeader(header);
    const sorted = [...data].sort((a, b) => b[sortKey] - a[sortKey]);
    const dataWithIdx = sorted.map((e, index) => ({ ...e, index: index + 1 }));
    const tableBody = makeData(dataSchema, dataWithIdx);

    return (
        <BoardContainer>
            <TableContainer component={Paper}>
                <Table>
                    {tableHeader}
                    {tableBody}
                </Table>
            </TableContainer>
        </BoardContainer>
    );
});

export default Board;