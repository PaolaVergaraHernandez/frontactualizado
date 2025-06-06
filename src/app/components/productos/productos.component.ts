import {
  CommonModule,
  NgFor,
  NgIf,
} from '@angular/common'; // Necesario para ngIf, ngFor, currency pipe
// src/app/components/productos/productos.component.ts
import {
  Component,
  OnInit,
} from '@angular/core';

import { environment } from '../../environments/environment';
import {
  Producto,
  ProductosService,
} from '../../services/productos.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-productos',
  standalone: true, // ¡Asegurado que sea standalone!
  imports: [
    CommonModule, NavbarComponent, FooterComponent, NgFor, NgIf  // ¡Importado FooterComponent!
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: Producto[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productoService.getPublicProducts().subscribe({
      next: (data: Producto[]) => { 
        console.log('ProductosComponent: Datos recibidos:', data); // <--- AÑADE ESTO
        this.products = data;
        this.loading = false;
      },
      error: (error: any) => { // Puedes tipar 'error' como HttpErrorResponse si importas desde @angular/common/http
        console.error('Error fetching products:', error);
        this.errorMessage = 'No se pudieron cargar los productos. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }
  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      // Si la URL ya es completa (ej. http://...), la usa tal cual
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      // Si es una ruta relativa (ej. "assets/imagen.png"), la une con la base de assets
      return `${environment.assetsUrlBase}/${imagePath}`;
    }
    // Imagen de placeholder si no hay imagen_url
    return 'https://placehold.co/400x300/e0e0e0/000000?text=No+Image';
  }
}