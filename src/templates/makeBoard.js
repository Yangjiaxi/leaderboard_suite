class TableConstructor {
    constructor() {
        this.header = [];
        this._cur_line = [];

        this.contentSchema = [];
        this.sortKey = "";
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

    result(key) {
        this.contentSchema.push(key);
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


export { TableConstructor, DataSchemeConfig };