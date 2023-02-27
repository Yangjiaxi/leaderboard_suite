// import Table from "cli-table3";
// import { makeTableLayout } from "cli-table3/src/layout-manager";
// import { ColSpanCell, RowSpanCell } from "cli-table3/src/cell";
import { TableConstructor, DataSchemeConfig } from "./makeBoard";
// import { readFile } from "fs/promises"; 

// const metricConfig = new DataSchemeConfig();

const table = new TableConstructor();

table
    .v_cell("Index", 3).v_cell("Model", 3).v_cell("Average", 3)
    .h_cell("Multi-modal Intent Prediction", 2)
    .h_cell("Multi-model Dialog Retrieval(T2I)", 2)
    .h_cell("Multi-modal Dialog Retrieval(I2T)", 2)
    .h_cell("Multi-modal Dialog State Tracking", 2)
    .h_cell("Multi-modal Response Generation", 2)
    .newline()

    .cell("PhotoChat",).cell("MMDialog",)
    .cell("PhotoChat").cell("MMDialog")
    .cell("ImageChat").cell("VisDial")
    .cell("SIMMC").cell("MMConv")
    .cell("SIMMC").cell("MMConv")
    .newline()

    .cell("F1").cell("F1").cell("R@1").cell("R@1").cell("R@1").cell("MRR").cell("Intent-F1").cell("A.C").cell("BLEU").cell("Inform")
    .header_ok()

    .result("name")
    .result("average")
    .result("mip-photochat-f1").result("mip-mmdialog-f1")
    .result("t2i-photochat-r1").result("t2i-mmdialog-r1")
    .result("i2t-imagechat-r1").result("i2t-visdial-mrr")
    .result("mdst-simmc-intent-f1").result("mdst-mmconv-a.c")
    .result("mrg-simmc-bleu").result("mrg-mmconv-inform")
    .sortBy("average");

export default table;

// table
//     .v_cell("", 3).v_cell("Model", 3).v_cell("Average", 3)
//     .h_cell("Multi-modal Intent Prediction", 6)
//     .h_cell("Multi-model Dialog Retrieval(T2I)", 6)
//     .h_cell("Multi-modal Dialog Retrieval(I2T)", 6)
//     .h_cell("Multi-modal Dialog State Tracking", 5)
//     .h_cell("Multi-modal Response Generation", 5)
//     .newline()

//     .h_cell("PhotoChat", 3).h_cell("MMDialog", 3)
//     .h_cell("PhotoChat", 3).h_cell("MMDialog", 3)
//     .h_cell("ImageChat", 2).h_cell("VisDial", 4)
//     .h_cell("SIMMC", 2).h_cell("MMConv", 3)
//     .h_cell("SIMMC", 1).h_cell("MMConv", 4)
//     .newline()

//     .cell("F1").cell("Precision").cell("Recall")
//     .cell("F1").cell("Precision").cell("Recall")
//     .cell("R@1").cell("R@5").cell("R@10")
//     .cell("R@1").cell("R@5").cell("R@10")
//     .cell("R@1").cell("R@5")
//     .cell("MRR").cell("R@1").cell("R@5").cell("R@10")
//     .cell("Intent-F1").cell("Slot-F1")
//     .cell("A.C").cell("A.N-C").cell("A.O")
//     .cell("BLEU")
//     .cell("Inform").cell("Success").cell("BLEU").cell("Comb.")
//     .header_ok();



// let printTable = new Table({ style: { head: [], border: [] } });

// for (const headerLine of table.header) {
//     let printLine = [];

//     for (const { rowSpan, colSpan, content } of headerLine) {
//         printLine.push({ rowSpan, colSpan, content, vAlign: "center", hAlign: "center" });
//     }
//     printTable.push(printLine);
// }

// console.log(printTable.toString());


// async function readJson(filename) {
//     const data = await readFile(`./page_result/${filename}.json`);
//     const jd = JSON.parse(data);
//     // console.log(d);
//     return jd;
// };

// async function addToTable(filename) {
//     const jsonData = await readJson(filename);
//     // console.log(jsonData);

//     let data_list = [0, filename];
//     for (const showKey of table.content_schema) {
//         // console.log(showKey);
//         data_list.push(jsonData[showKey]);
//     }
//     printTable.push(data_list);
//     console.log(printTable.toString());

// }

// addToTable("vue_result");
// addToTable("prev_sota");

// // console.log(printTable.toString());

// // const d = await readFile("./page_result/vue_result");
// // console.log(d);

// // const data = JSON.parse(await readFile("./page_result/vue_result"));
// // console.log(data);

// // for (const line of makeTableLayout(printTable)) {
// //     for (const cell of line) {
// //         if (cell instanceof ColSpanCell || cell instanceof RowSpanCell) process.stdout.write(".");
// //         else process.stdout.write(cell["content"]);
// //         process.stdout.write(" | ");
// //     }
// //     console.log();
// // }
