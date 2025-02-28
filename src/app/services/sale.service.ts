import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sale} from '../models/Sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }
  private host:string="http://localhost:8888/SALE-SERVICE/api/sales";

  getSales(){
    return this.http.get<Array<Sale>>(this.host);
  }


  updateSale(id:number,sale:any){
    return this.http.put<any>(this.host+"/"+id,sale);
  }
  postSale(sale:any){
    return this.http.post<any>(this.host,sale);
  }
  deleteSale(id:number){
    return this.http.delete<any>(this.host+'/'+id);
  }
}
