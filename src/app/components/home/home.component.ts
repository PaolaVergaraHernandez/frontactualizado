import {
  CommonModule,
  NgFor,
} from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Producto,
  ProductosService,
} from '../../services/productos.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { InfoSectionComponent } from '../info-section/info-section.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, NgFor, RouterLink, CarouselComponent, InfoSectionComponent, NavbarComponent, FooterComponent, ProductCardComponent]
})
export class HomeComponent implements OnInit {
  products: Producto[] = [];
  displayProducts: Producto[] = [];

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.getProductsForHome();
  }

  getProductsForHome(): void {
    this.productoService.getPublicProducts().subscribe({
      next: (data: Producto[]) => {
        // Simplemente toma los primeros 4 productos tal como vienen de la API
        this.products = data; // Guarda todos los productos si los necesitas para algo más
        this.displayProducts = this.products.slice(0, 4); // Toma los primeros 4
      },
      error: (error: any) => {
        console.error('Error fetching products for home page:', error);
        // Manejar error, ej., mostrar un mensaje al usuario
      }
    });
  }

  filterResults(text: string) {
    // ... (sin cambios)
  }
}