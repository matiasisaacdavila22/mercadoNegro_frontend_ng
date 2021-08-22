import { ProductModel} from "./product.model";

export class ProductImageModel {
  id!:String;
  name!:string;
  orden!:number;
  product!:ProductModel;
  productId!:number;
}
