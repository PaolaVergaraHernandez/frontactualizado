import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

declare var bootstrap: any;
  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CartIconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
}
closeMenu() {
  this.isMenuOpen = false;
}
}