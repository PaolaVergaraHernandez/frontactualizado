import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent {
  cartItemCount = 0; // Aquí puedes luego enlazar con un servicio de carrito real
}
