import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

class Client {
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  private host:string="http://localhost:8888/CLIENT-SERVICE/api/clients";

  getClients(){
    return this.http.get<Array<Client>>(this.host);
  }

  updateClient(id:number,client:any){
    return this.http.put<any>(this.host+"/"+id,client);
  }
  postClient(client:any){
    return this.http.post<any>(this.host,client);
  }
  deleteClient(id:number){
    return this.http.delete<any>(this.host+'/'+id);
  }
}
