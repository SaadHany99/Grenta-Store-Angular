import { ICategory } from "./ICategory";

export interface IProduct{
    id:number;
    name:string;
    price:number;
    quantity:number;
    image: string;
    description:string;
    categ_Id: number;
    category:ICategory
}