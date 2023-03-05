import { Cell, TableConstructor } from "../src/server/makeBoard";

const tableEX = new TableConstructor();

tableEX
    .scope("accuracy")
    .tableName("Leaderboard - Execution Accuracy")
    .cell("Model").cell("Code").cell("Size").cell("Tunable Params").cell("Dev (%)").cell("Test (%)")
    .header_ok()
    .indexWithResult(Cell.key("time").badge())
    .multilineResult([Cell.key("name").bold(), Cell.key("creator").italic()])
    .result(Cell.key("repo").link())
    .result(Cell.key("size").mono())
    .result(Cell.key("params").mono())
    .result(Cell.key("dev_acc"))
    .result(Cell.key("test_acc"))
    .sortBy("dev_acc");

const tableES = new TableConstructor();

tableES
    .scope("efficiency")
    .tableName("Leaderboard - Efficiency Score")
    .cell("Model").cell("Code").cell("Size").cell("Tunable Params").cell("Dev (%)").cell("Test (%)")
    .header_ok()
    .indexWithResult(Cell.key("time").badge())
    .multilineResult([Cell.key("name").bold(), Cell.key("creator").italic()])
    .result(Cell.key("repo").link())
    .result(Cell.key("size").mono())
    .result(Cell.key("params").mono())
    .result(Cell.key("dev_acc"))
    .result(Cell.key("test_acc"))
    .sortBy("dev_acc");

const allTables = [tableEX, tableES];

export default allTables;
