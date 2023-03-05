class Cell {
    constructor(keyName, opt) {
        this.keyName = keyName;
        this.config = {
            type: "plain",
            isBold: false,
            isItalic: false,
            isMono: false,
            ...opt,
        };
    }

    static key(keyName) { return new Cell(keyName); }

    plain() {
        this.config = { ...this.config, type: "plain" };
        return this;
    }

    bold() {
        this.config = { ...this.config, isBold: true };
        return this;
    }

    italic() {
        this.config = { ...this.config, isItalic: true };
        return this;
    }

    mono() {
        this.config = { ...this.config, isMono: true };
        return this;
    }

    badge() {
        this.config = { ...this.config, type: "badge" };
        return this;
    }

    link() {
        this.config = { ...this.config, type: "link" };
        return this;
    }

    static make(keyName, opt) { return new Cell(keyName, opt); }
}

class TableConstructor {
    constructor() {
        this.name = "Table";
        this.scopeName = null;

        this.header = [];
        this._cur_line = [];

        this.contentSchema = [];
        this.sortKey = "";
        this.indexSchema = [Cell.key("__index")];
    }

    scope(scopeName) {
        this.scopeName = scopeName;
        return this;
    }

    tableName(name) {
        this.name = name;
        return this;
    }

    newline() {
        this.header.push(this._cur_line);
        this._cur_line = [];
        return this;
    }

    header_ok() {
        return this.newline();
    }

    hv_cell({ content, colSpan = 1, rowSpan = 1 }) {
        this._cur_line.push({ content, colSpan, rowSpan });
        return this;
    }

    cell(content) {
        return this.hv_cell({ content, colSpan: 1, rowSpan: 1 });
    }

    h_cell(content, colSpan) {
        return this.hv_cell({ content, colSpan, rowSpan: 1 });
    }

    v_cell(content, rowSpan) {
        return this.hv_cell({ content, colSpan: 1, rowSpan });
    }

    indexWithResult(key) {
        this.indexSchema = [Cell.key("__index"), key];
        return this;
    }

    indexWithMultilineResult(keys) {
        this.indexSchema = [Cell.key("__index"), ...keys];
        return this;
    }

    result(key) {
        this.contentSchema.push([key]);
        return this;
    }

    multilineResult(keys) {
        this.contentSchema.push(keys);
        return this;
    }

    sortBy(key) {
        this.sortKey = key;
    }
}

class DataSchemeConfig {
    constructor() {
        this.schema = {};
    }

    add(key, text) {
        this.schema[key] = text;
    }
}

export { TableConstructor, DataSchemeConfig, Cell };
