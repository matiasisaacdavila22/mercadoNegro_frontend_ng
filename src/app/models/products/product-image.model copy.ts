import { ProductModel} from "./product.model";

export class ProductImageModel {
  id!:String;
  name!:String;
  orden!:number;
  product!:ProductModel;
  productId!:number;
}
