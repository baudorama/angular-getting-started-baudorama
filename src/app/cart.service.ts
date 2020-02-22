import { Injectable } from "@angular/core";
import uuidv4 from "uuid/v4";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable, of, Subscription } from "rxjs";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: "root" 
})
export class CartService {
  items = [];
  products: any = [];
  total = 0;

  private itemsUpdated = new Subject<any[]>();
  private loadingSubscription: Subscription;
  private loadingStatus: Boolean;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    if (localStorage.getItem("cart")) {
      this.items = JSON.parse(localStorage.getItem("cart"));
      this.total = 0;
      this.items.forEach(item => {
        this.total += item.price;
      });
      this.itemsUpdated.next([...this.items]);
    }

    this.loadingSubscription = this.loadingService
      .getLoadingSubscription()
      .subscribe(value => {
        this.loadingStatus = value;
      });

    this.loadingService.setLoadingStatus(true);
    this.http.get("/assets/products.json").forEach(a => {
      setTimeout(() => {
        this.products = a;
        this.loadingService.setLoadingStatus(false);
      }, 1000); //Simula caricamento lungo
    });
  }

  getTotal() {
    return this.total;
  }

  addToCart(product) {
    product.uuid = uuidv4();
    product.id = this.items.length;
    this.items.push(Object.assign({}, product));
    this.total = 0;
    this.items.forEach(item => {
      this.total += item.price;
    });
    this.itemsUpdated.next([...this.items]);
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  getItemsListener() {
    return this.itemsUpdated.asObservable();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.total = 0;
    this.itemsUpdated.next([...this.items]);
    localStorage.removeItem("cart");
  }

  deleteItem(item) {
    let newitems = [];
    for (let i of this.items) {
      if (i.uuid != item.uuid) {
        newitems.push(i);
      }
    }
    this.items = newitems;
    this.total = 0;
    this.items.forEach(item => {
      this.total += item.price;
    });
    this.itemsUpdated.next([...this.items]);
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }

  getProducts() {
    if (this.products.length == 0) {
      setTimeout(() => {
        return this.products;
      }, 1000);
    }
    return this.products;
  }

  getProduct(index) {
    return this.products[index];
  }
}
