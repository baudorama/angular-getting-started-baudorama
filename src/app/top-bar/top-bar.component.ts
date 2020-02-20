import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CartService } from "../cart.service";
import { LoadingService } from "../loading.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit, OnDestroy {
  items = [];
  totalItems = 0;
  total = 0;
  private itemsSubscription: Subscription;
  private loadingStatusSubscription: Subscription;
  loadingStatus: Boolean = true;

  constructor(
    private cartService: CartService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.totalItems = this.items.length;
    this.total = this.cartService.getTotal();
    this.itemsSubscription = this.cartService
      .getItemsListener()
      .subscribe(items => {
        this.items = items;
        this.totalItems = items.length;
        this.total = this.cartService.getTotal();
      });

    this.loadingStatusSubscription = this.loadingService
      .getLoadingSubscription()
      .subscribe(value => {
        this.loadingStatus = value;
      });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.loadingStatusSubscription.unsubscribe();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
