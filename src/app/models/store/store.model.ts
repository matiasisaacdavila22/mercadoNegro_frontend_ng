
import { UserModel} from "./user.model";


export class StoreModel {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    storeName?: string;
    description?:string;
    adress?: string;
    storeEmail?:string;
    storePhone?:string;
    password?:string;
    userId?: string;
    role :number = 0;
    token?: string;
    isLoggend: Boolean = false;
    photo?:string;
   }
