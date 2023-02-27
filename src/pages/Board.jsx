import styled from "@emotion/styled";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { memo } from "react";

const BoardContainer = styled(Box)(() => {
    return { width: "100%", };
});

const TableCellNoWrap = styled(TableCell)({ whiteSpace: "nowrap" });

const makeHeader = (headerSchema) =>
    <TableHead>
        {headerSchema.map((headerRow, index) => makeHeaderRow(headerRow, index))}
    </TableHead>;

const makeHeaderRow = (headerRowSchema, index) =>
    <TableRow key={index}>
        {headerRowSchema.map((headerCellSchema, indexCell) => makeHeaderCell(headerCellSchema, indexCell))}
    </TableRow>;

const makeHeaderCell = ({ content, colSpan, rowSpan }, index) =>
    <TableCellNoWrap key={index} colSpan={colSpan} rowSpan={rowSpan}>
        {content}
    </TableCellNoWrap>;

const makeData = (contentKeys, data) => {
    return <TableBody>
        {data.map((line, index) => makeDataRow(contentKeys, line, index))}
    </TableBody>;
};

const makeDataRow = (contentKeys, line, index) => {
    return <TableRow key={index}>
        <TableCellNoWrap key={0}>{index + 1}</TableCellNoWrap>
        {contentKeys.map((wantedKey, cellIndex) => <TableCellNoWrap key={cellIndex + 1}>{line[wantedKey]}</TableCellNoWrap>)}
    </TableRow>;
};

const Board = memo(({ schema, data }) => {
    const tableHeader = makeHeader(schema.header);
    data.sort((a, b) => b[schema.sortKey] - a[schema.sortKey]);
    const tableBody = makeData(schema.contentSchema, data);

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