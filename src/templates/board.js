import { TableConstructor, Cell } from "./makeBoard";

// import CliTable3 from "cli-table3";
// const metricConfig = new DataSchemeConfig();

const table = new TableConstructor();

table
    .cell("Model").cell("Code").cell("Size").cell("Tunable Params").cell("Dev (%)").cell("Test (%)")
    .header_ok()
    .multilineResult([Cell.plain("name"), Cell.italic("creator"), Cell.badge("time")])
    .result(Cell.link("repo"))
    .result(Cell.plain("size"))
    .result(Cell.plain("params"))
    .result(Cell.plain("dev_acc"))
    .result(Cell.plain("test_acc"))
    .sortBy("dev_acc");

export default table;

// let printTable = new CliTable3({ style: { head: [], border: [] } });

// for (const headerLine of table.header) {
//     let printLine = [];

//     for (const { rowSpan, colSpan, content } of headerLine) {
//         printLine.push({ rowSpan, colSpan, content, vAlign: "center", hAlign: "center" });
//     }
//     printTable.push(printLine);
// }

// console.log(printTable.toString());
