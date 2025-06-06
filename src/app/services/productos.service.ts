import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  from,
  Observable,
} from 'rxjs'; // from y of
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

// Definición de la interfaz Producto
export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Este método obtiene los encabezados de autorización incluyendo el token
  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getCurrentUserToken()).pipe(
      map(token => {
        if (!token) {
          console.warn('No hay token de autenticación disponible. Esto podría causar un 401 si la ruta es protegida.');
          return new HttpHeaders({
            'Content-Type': 'application/json'
          });
        }
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
      })
    );
  }

  // Obtener todos los productos para administradores
  getPublicProducts(): Observable<Producto[]> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.get<Producto[]>(`${this.backendUrl}/productos`, { headers });
  }
  // este es para los administradorez. 
  getProducts(): Observable<Producto[]> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.get<Producto[]>(`${this.backendUrl}/productos`, { headers }))
    );
  }

  // Añadir un nuevo producto
  // Renombrado de addProducto() a addProduct()
  addProduct(producto: Producto): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.post<any>(`${this.backendUrl}/productos`, producto, { headers }))
    );
  }

  // Actualizar un producto existente
  // Renombrado de updateProducto() a updateProduct()
  updateProduct(id: number, producto: Producto): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.put<any>(`${this.backendUrl}/productos/${id}`, producto, { headers }))
    );
  }

  // Eliminar un producto
  // Renombrado de deleteProducto() a deleteProduct()
  deleteProduct(id: number): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.delete<any>(`${this.backendUrl}/productos/${id}`, { headers }))
    );
  }
}