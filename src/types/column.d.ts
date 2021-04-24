export enum ColumnDataType {
    string = "string",
    boolean = "boolean",
    number = "number",
    null = "null"
}

export default interface Column {
    _id: string,
    name: string,
    displayName: string,
    dataType: ColumnDataType,
    require: boolean,
    belongTableId: string,
}