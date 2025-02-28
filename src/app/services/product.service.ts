import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private host:string="http://localhost:8888/PRODUCT-SERVICE/api/products";

  getProducts(){
    return this.http.get<Array<Product>>(this.host);
  }

  updateProduct(id:number,product:any){
    return this.http.put<any>(this.host+"/"+id,product);
  }
  postProduct(product:any){
    return this.http.post<any>(this.host,product);
  }
  deleteProduct(id:number){
    return this.http.delete<any>(this.host+'/'+id);
  }

}
