import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
import { Subscription } from "rxjs";
import {LoadingService} from '../loading.service';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  
  products = [];
  private loadingSubscription: Subscription;
    
  constructor(private cartService: CartService, private loadingService: LoadingService) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.loadingSubscription = this.loadingService.getLoadingSubscription().subscribe(value=>{
      if (value==false) {
        this.products = this.cartService.getProducts();
      }
    });

  }

  share() {
    window.alert("The product has been shared!");
  }

  onNotify(product) {
    window.alert(product.name + " costs " + product.price);
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  
}
