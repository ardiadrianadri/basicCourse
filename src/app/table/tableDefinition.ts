export interface ITable<T> {
    totalNumber: number;
    page: number;
    totalPages: number;
    size: number;
    data: T[];
}