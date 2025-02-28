import {Product} from './Product.model';
import {Client} from './Client.model';

export interface Sale {
   id:number;
   date:Date;
   idc:number;
   idp:number;
   client:Client;
   product:Product;
}
