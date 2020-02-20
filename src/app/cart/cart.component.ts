import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "../cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  items = [];
  total = 0;
  private itemsSubscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.itemsSubscription = this.cartService
      .getItemsListener()
      .subscribe(items => {
        this.items = items;
        this.total = this.cartService.getTotal();
      });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  del(item) {
    this.cartService.deleteItem(item);
    this.total=this.cartService.getTotal();
  }

  clear() {
    this.cartService.clearCart();
    this.total=this.cartService.getTotal();
  }

  shipping() {
    console.log(this.cartService.getShippingPrices());
  }
}
