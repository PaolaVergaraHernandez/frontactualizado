import {
  CommonModule,
} from '@angular/common'; // Import CommonModule for NgIf, CurrencyPipe
import {
  Component,
  Input,
} from '@angular/core';

import {
  Producto,
} from '../../services/productos.service'; // Assuming Producto interface is here

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Producto; // Input property to receive product data

  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      return `<span class="math-inline">\{environment\.assetsUrlBase\}/</span>{imagePath}`;
    }
    return 'https://placehold.co/400x300/e0e0e0/000000?text=No+Image';
  }
}