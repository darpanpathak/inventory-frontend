export interface IProduct{
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    categoryName?: string;
}

export interface ICategory{
    id: number;
    category: string;
    description: string;
}