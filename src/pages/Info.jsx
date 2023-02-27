import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Button, Divider, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { memo } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';

import { Anchor } from "./Utils";

let globalHrCount = 0;

const InfoContainer = styled(Paper)(() => {
    const { spacing } = useTheme();
    return {
        width: "100%",
        margin: spacing(2),
        padding: spacing(2),
    };
});

// const oneColumnSizeMapper = { h1: "h2", h2: "h3", h3: "h4", h4: "h5", h5: "h6", h6: "h6" };
// const twoColumnSizeMapper = { h1: "h3", h2: "h4", h3: "h5", h4: "h6", h5: "h6", h6: "h6" };
const headerSizeMapper = { h1: "h3", h2: "h4", h3: "h5", h4: "h6", h5: "h6", h6: "h6" };

const headerRendererFn = (variant) => ({ children }) => {
    const { spacing } = useTheme();

    let preHr = "";
    if (variant <= "h2") {
        globalHrCount += 1;
        if (globalHrCount > 1) preHr = <Divider style={{ margin: spacing(2) }} variant="fullWidth" />;
    }

    return (
        <>
            {preHr}
            <Typography fontWeight="bold" variant={headerSizeMapper[variant]}>{children}</Typography>
        </>
    );
};

const olRenderer = ({ children }) => (<List >{children}</List>);
const ulRenderer = ({ children }) => (<List>{children}</List>);
const liRenderer = ({ children, ordered, index }) => <ListItem disablePadding><Typography>{ordered ? `${index + 1}. ${children}` : children}</Typography></ListItem>;
const imgRenderer = ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: "100%" }} />;
const paragraphRenderer = ({ children }) => (<Typography component="span" display="block">{children}</Typography>);

const aRenderer = ({ children, href }) => {
    const textString = children[0];
    const BUTTON_PREFIX = "button:";

    if (textString.startsWith(BUTTON_PREFIX)) {
        const text = textString.slice(BUTTON_PREFIX.length);
        return (
            <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                <Button
                    color="primary" variant="contained"
                    href={href}
                    target='_blank' rel='noopener noreferrer'
                    style={{ minWidth: "75%", margin: "20px" }}>
                    {text}
                </Button>
            </Box >
        );
    }

    else {
        return <Anchor to={href}>{children}</Anchor>;
    }
};

const StyledCode = styled("code")(() => {
    const { spacing } = useTheme();
    return {
        border: "1px solid #999",
        margin: `0 ${spacing(0.5)}`,
        padding: `2px ${spacing(1)}`,
        borderRadius: "2px",
        backgroundColor: 'rgba(255,229,100,.2)',
    };
});

const codeRenderer = ({ inline, children, className }) => {
    const match = /language-(\w+)/.exec(className || '');

    if (inline) {
        return <StyledCode>{children}</StyledCode>;
    }
    else {
        return <SyntaxHighlighter children={String(children).replace(/\n$/, '')} language={match[1]} customStyle={{ fontSize: "0.75em" }} />;
    }
};

const TableCellNoWrap = styled(TableCell)({ whiteSpace: "nowrap" });
const tableRenderer = ({ children }) => <TableContainer component={Paper}><Table size="small">{children}</Table></TableContainer>;
const tableHeadRenderer = ({ children }) => <TableHead>{children}</TableHead>;
const tableBodyRenderer = ({ children }) => <TableBody>{children}</TableBody>;
const tableRowRenderer = ({ children }) => <TableRow>{children}</TableRow>;
const tableCellRenderer = ({ children }) => <TableCellNoWrap>{children}</TableCellNoWrap>;
const tableHeaderCellRenderer = ({ children }) => <TableCellNoWrap>{children}</TableCellNoWrap>;


const Info = memo(({ detail }) => {
    return (
        <InfoContainer elevation={1}>
            <ReactMarkdown
                children={detail}
                components={{
                    ...Object.fromEntries(["h1", "h2", "h3", "h4", "h5", "h6"].map(x => [x, headerRendererFn(x)])),
                    p: paragraphRenderer,
                    li: liRenderer, ul: ulRenderer, ol: olRenderer,
                    a: aRenderer,
                    img: imgRenderer,
                    code: codeRenderer,
                    table: tableRenderer,
                    thead: tableHeadRenderer,
                    tbody: tableBodyRenderer,
                    tr: tableRowRenderer,
                    td: tableCellRenderer,
                    th: tableHeaderCellRenderer,
                }}
                className="markdown-container"
                remarkPlugins={[remarkGfm]}
            />
        </InfoContainer>
    );
});

export default Info;