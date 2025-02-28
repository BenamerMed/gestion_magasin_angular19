import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {Client} from '../models/Client.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './client.component.html',
  standalone: true,
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  title = 'clients';
  client!: Client;
  clients: Array<any>= [];
  testClient = {name: "", email: "", phone: ""}

  constructor(private http: HttpClient, public router: Router, private clientService:ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: value => {
        this.clients = value
      }, error: err => {
        console.log(err)
      }
    });
  }

  updateClient(upd: NgForm) {
    alert("update successful");
    let valeur = upd.value;
    if (valeur.name == "")
      valeur.name = this.client.name;

    if (valeur.email == "")
      valeur.email = this.client.email;

    if (valeur.phone == "")
      valeur.phone = this.client.phone;

    let clientPost = {name: valeur.name, email: valeur.email, phone: valeur.phone};
    this.clientService.updateClient(this.client.id, clientPost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  //for post
  postClient(add: NgForm) {
    alert("Post successful")
    let valeur = add.value;
    let clientPost = {name: valeur.name, email: valeur.email, phone: valeur.phone};
    this.clientService.postClient(clientPost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  deleteClient(client_delete: Client) {
    if (confirm("Are you sure?")) {
      alert("Delete successful");
      this.clientService.deleteClient(client_delete.id).subscribe({
        next: value => {
        }
      });
    } else {
      alert("delete failed .")
    }
  }

  getClient(client: Client): Client {
    return this.client = client;
  }

  refresh() {
    this.router.navigateByUrl("", {skipLocationChange: true}).then(() => {
      this.router.navigate(['/clients']).then(() => {
        history.go(0);
      })
    })
  }
}
