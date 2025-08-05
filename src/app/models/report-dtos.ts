export interface reportItemDTO {
    id: number;
    title: string;
    creationDate: string;
    author: string;
    selected?: boolean;
}

export interface reportDTO {
    id: number;
    title: string;
    creationDate: string;
    creationTime: string;
    author: string;
    products?: string;
    category?: string;
    region?: string;
    salesRange?: string;
    dateRange?: string;
    filterSelection?: string[];
}