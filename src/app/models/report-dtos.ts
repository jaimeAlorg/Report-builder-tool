export interface ReportItemDTO {
    id: number;
    title: string;
    creationDate: string;
    creationTime: string;
    author: string;
    selected?: boolean;
}

export interface ReportDTO {
    id: number;
    title: string;
    creationDate: string;
    creationTime: string;
    author: string;
    product: string[];
    category: string[];
    region: string[];
    dateRange?: { start: string; end: string };
    includeId?: boolean;
    includeSalesData?: boolean;

}