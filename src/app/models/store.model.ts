
import { UserModel} from "./user.model";


export class StoreModel {
    id?: String;
    name?: String;
    lastName?: String;
    email?: String;
    phone?: String;
    storeName?: String;
    storeAddress?: String;
    storeEmail?:String;
    storePhone?:String;
    password?:String;
    userId?: String;
    role?:number;
    token?: String;
    isLoggend: Boolean = false;
   }
