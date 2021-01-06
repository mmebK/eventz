import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {

    this.listCartDetails();
    console.log('price: ' + this.totalPrice + 'quantity: ' + this.totalQuantity);
  }

  incrementQuantity(item: CartItem) {

    this.cartService.addToCart(item);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    this.cartService.computeCartTotal();
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
}
