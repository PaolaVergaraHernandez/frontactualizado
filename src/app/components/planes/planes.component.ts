import {
  CommonModule,
  isPlatformBrowser,
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';

declare var bootstrap: any;

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  planes = [
    {
      nombre: 'Visita',
      precio: '$35/Dia',
      beneficios: [
        'Acceso ilimitado al gimnasio',
        'Rutina personalizadas'
      ]
    },
    {
      nombre: 'Plan Semanal',
      precio: '$150/semana',
      beneficios: [
        'Acceso ilimitado al gimnasio',
        'Rutinas personalizadas',
        'Acceso a clases grupales'
      ]
    },
    {
      nombre: 'Plan Mensual',
      precio: '$350/mes',
      beneficios: [
        'Acceso ilimitado al gimnasio',
        'Rutinas personalizadas',
        'Acceso a clases grupales',
        'Descuentos en productos de la tienda'
      ]
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const carouselElement = document.querySelector('#carouselExampleAutoplaying');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 1000,
          ride: 'carousel'
        });
      }
    }
  }
}
