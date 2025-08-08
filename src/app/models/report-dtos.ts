export interface reportItemDTO {
    id: number;
    title: string;
    creationDate: string;
    creationTime: string;
    author: string;
    selected?: boolean;
}

export interface reportDTO {
    id: number;
    title: string;
    creationDate: string;
    creationTime: string;
    author: string;
    products: string[];
    category: string[];
    region: string[];
    dateRange?: { start: string; end: string };
    includeId?: boolean;
    includeSalesData?: boolean;

}