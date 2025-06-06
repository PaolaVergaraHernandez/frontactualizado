import {
  CommonModule,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './carrito.component.html'
})

export class CarritoComponent {
  cartItems = [
    { title: 'Proteína Whey', description: 'Ideal para masa muscular.', price: 650 },
    { title: 'BCAA 6000', description: 'Recuperación muscular.', price: 400 }
  ];

 emptyCart = false;
checkCart() {
  this.emptyCart = this.cartItems.length === 0;
}
}