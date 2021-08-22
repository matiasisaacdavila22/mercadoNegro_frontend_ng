import { BrandModel } from "../parameters/brand.model";
import { CategoryModel } from "../parameters/category.model";

export class ProductModel {
  id!:string;
  categoryId!:String;
  brandId!:String;
  category!:CategoryModel;
  brand!:BrandModel;
  model!:String;
  name!:string;
  description!:String;
  photo!:String;
  price!:number;
  cost!:number;
  stock!:number;
  condition!:number;
}
