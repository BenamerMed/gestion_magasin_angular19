import {Component, OnInit} from '@angular/core';
import {Sale} from '../models/Sale.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SaleService} from '../services/sale.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-sale',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './sale.component.html',
  standalone: true,
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{
  title = 'sales';
  sale!: Sale;
  sales: Array<Sale> = [];
  testSale = {date: "", idc: "", idp: ""}

  constructor(private http: HttpClient, public router: Router, private saleService:SaleService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales().subscribe({
      next: value => {
        this.sales = value
      }, error: err => {
        console.log(err)
      }
    });
  }

  updateSale(upd: NgForm) {
    alert("update successful");
    let valeur = upd.value;
    if (valeur.date == "")
      valeur.date = this.sale.date;

    if (valeur.idc == "")
      valeur.idc = this.sale.idc;

    if (valeur.price == "")
      valeur.idp = this.sale.idp;

    let salePost = {name: valeur.date, idc: valeur.idc, idp: valeur.idp};
    this.saleService.updateSale(this.sale.id, salePost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  //for post
  postSale(add: NgForm) {
    alert("Post successful")
    let valeur = add.value;
    let salePost = {date: valeur.date, idc: valeur.idc, idp: valeur.idp};
    this.saleService.postSale(salePost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  deleteSale(sale_delete: Sale) {
    if (confirm("Are you sure?")) {
      alert("Delete successful");
      this.saleService.deleteSale(sale_delete.id).subscribe({
        next: value => {
        }
      });
    } else {
      alert("delete failed .")
    }
  }

  getSale(sale: Sale): Sale {
    return this.sale = sale;
  }

  refresh() {
    this.router.navigateByUrl("", {skipLocationChange: true}).then(() => {
      this.router.navigate(['/sales']).then(() => {
        history.go(0);
      })
    })
  }
}
