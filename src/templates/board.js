import { TableConstructor, Cell } from "./makeBoard";

const tableEX = new TableConstructor();

tableEX
    .scope("accuracy")
    .tableName("Execution Accuracy")
    .cell("Model").cell("Code").cell("Size").cell("Tunable Params").cell("Dev (%)").cell("Test (%)")
    .header_ok()
    .indexWithResult(Cell.badge("time"))
    .multilineResult([Cell.bold("name"), Cell.italic("creator")])
    .result(Cell.link("repo"))
    .result(Cell.mono("size"))
    .result(Cell.mono("params"))
    .result(Cell.plain("dev_acc"))
    .result(Cell.plain("test_acc"))
    .sortBy("dev_acc");


const tableES = new TableConstructor();

tableES
    .scope("efficiency")
    .tableName("Execution Accuracy")
    .cell("Model").cell("Code").cell("Size").cell("Tunable Params").cell("Dev (%)").cell("Test (%)")
    .header_ok()
    .indexWithResult(Cell.badge("time"))
    .multilineResult([Cell.bold("name"), Cell.italic("creator")])
    .result(Cell.link("repo"))
    .result(Cell.mono("size"))
    .result(Cell.mono("params"))
    .result(Cell.plain("dev_acc"))
    .result(Cell.plain("test_acc"))
    .sortBy("dev_acc");


const allTables = [tableEX, tableES];

export default allTables;