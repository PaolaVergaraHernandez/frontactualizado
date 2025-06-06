import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  metodoEntrega: string = '';
  estado: string = '';
}
