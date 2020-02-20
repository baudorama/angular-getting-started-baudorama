import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
    ) { }

    product;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.product = this.cartService.getProduct(params.get('productId'));
  });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

}