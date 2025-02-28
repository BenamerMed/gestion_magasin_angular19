import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product.model';

import {Location, NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../services/product.service';
import {HttpClient} from '@angular/common/http';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  title = 'products';
  product!: Product;
  products: Array<Product> = [];
  testProduct = {name: "", description: "", price: ""}

  constructor(private http: HttpClient, public router: Router, private productService:ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: value => {
        this.products = value
      }, error: err => {
        console.log(err)
      }
    });
  }

  updateProduct(upd: NgForm) {
    alert("update successful");
    let valeur = upd.value;
    if (valeur.name == "")
      valeur.name = this.product.name;

    if (valeur.description == "")
      valeur.description = this.product.description;

    if (valeur.price == "")
      valeur.price = this.product.price;

    let productPost = {name: valeur.name, description: valeur.description, price: valeur.price};
    this.productService.updateProduct(this.product.id, productPost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  //for post
  postProduct(add: NgForm) {
    alert("Post successful")
    let valeur = add.value;
    let productPost = {name: valeur.name, description: valeur.description, price: valeur.price};
    this.productService.postProduct(productPost).subscribe({
      next: value => {
      }, error: err => {
        console.log(err)
      }
    })
  }

  deleteProduct(product_delete: Product) {
    if (confirm("Are you sure?")) {
        alert("Delete successful");
        this.productService.deleteProduct(product_delete.id).subscribe({
          next: value => {
          }
        });
      } else {
        alert("delete failed .")
      }
  }

  getProduct(product: Product): Product {
    return this.product = product;
  }

  refresh() {
    this.router.navigateByUrl("", {skipLocationChange: true}).then(() => {
      this.router.navigate(['/products']).then(() => {
        history.go(0);
      })
    })
  }

}
