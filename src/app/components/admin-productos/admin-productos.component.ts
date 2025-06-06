import { CommonModule } from '@angular/common';
// src/app/components/admin-productos/admin-productos.component.ts
import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Producto,
  ProductosService,
} from '../../services/productos.service'; // Importa la interfaz Producto y el servicio

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: Producto[] = [];
  // Objeto para el formulario de añadir producto, inicializado con valores por defecto
  // Ajusta la inicialización de precio y stock a 0 o undefined si el formulario así lo requiere
  // y la interfaz Producto no permite null para ellos.
  // Si precio y stock SI pueden ser null, entonces la interfaz debe ser number | null.
  newProduct: Producto = { 
    nombre: '', 
    descripcion: '', // Inicializar como cadena vacía
    precio: 0,       // Inicializar a 0 o un valor por defecto válido
    stock: 0,        // Inicializar a 0 o un valor por defecto válido
    imagen_url: ''   // Inicializar como cadena vacía
  };
  // Objeto para el formulario de editar producto, null por defecto
  editingProduct: Producto | null = null;

  loading: boolean = false;
  errorLoadingProducts: string = '';
  addProductMessage: string = '';
  addProductError: string = '';
  updateProductMessage: string = '';
  updateProductError: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.loading = true;
    this.errorLoadingProducts = '';
    this.productosService.getProducts().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.errorLoadingProducts = 'No se pudieron cargar los productos. Asegúrate de haber iniciado sesión y que el backend esté funcionando correctamente.';
        this.loading = false;
      }
    });
  }

  onAddProduct(): void {
    this.addProductMessage = '';
    this.addProductError = '';

    // Validaciones básicas antes de enviar al servicio
    // Asegúrate de que precio y stock sean números válidos.
    // Si los campos son opcionales para el SP, la validación puede ser menos estricta
    if (!this.newProduct.nombre || this.newProduct.precio === null || this.newProduct.stock === null) {
      this.addProductError = 'Por favor, completa los campos obligatorios (nombre, precio, stock).';
      return;
    }
    if (isNaN(this.newProduct.precio) || isNaN(this.newProduct.stock)) {
      this.addProductError = 'Precio y stock deben ser números válidos.';
      return;
    }


    this.productosService.addProduct(this.newProduct).subscribe({
      next: (response: any) => {
        this.addProductMessage = 'Producto añadido con éxito!';
        console.log('Producto añadido:', response);
        // Limpiar el formulario y recargar la lista
        this.newProduct = { nombre: '', descripcion: '', precio: 0, stock: 0, imagen_url: '' }; // Resetear a valores iniciales
        this.loadProductos();
        setTimeout(() => this.addProductMessage = '', 3000);
      },
      error: (err: any) => {
        console.error('Error al añadir producto:', err);
        this.addProductError = 'Error al añadir producto. Por favor, inténtalo de nuevo.';
        if (err.error && err.error.error) {
          this.addProductError = `Error: ${err.error.error}`;
        } else if (err.message) {
          this.addProductError = `Error: ${err.message}`;
        } else {
          this.addProductError = `Error desconocido al añadir producto.`;
        }
      }
    });
  }

  editProduct(producto: Producto): void {
    // Asegura que los campos null del backend se conviertan a cadena vacía para los inputs HTML
    this.editingProduct = { 
      ...producto,
      descripcion: producto.descripcion || '',
      imagen_url: producto.imagen_url || ''
    }; 
    this.updateProductMessage = '';
    this.updateProductError = '';
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.updateProductMessage = '';
    this.updateProductError = '';
  }

  onUpdateProduct(): void {
    if (!this.editingProduct || this.editingProduct.id_producto === undefined || this.editingProduct.id_producto === null) {
      this.updateProductError = 'No hay producto seleccionado para actualizar o ID inválido.';
      return;
    }

    this.updateProductMessage = '';
    this.updateProductError = '';

    if (!this.editingProduct.nombre || this.editingProduct.precio === null || this.editingProduct.stock === null) {
      this.updateProductError = 'Por favor, completa los campos obligatorios (nombre, precio, stock) para actualizar.';
      return;
    }
    if (isNaN(this.editingProduct.precio) || isNaN(this.editingProduct.stock)) {
      this.updateProductError = 'Precio y stock deben ser números válidos.';
      return;
    }

    this.productosService.updateProduct(this.editingProduct.id_producto, this.editingProduct).subscribe({
      next: (response) => {
        this.updateProductMessage = 'Producto actualizado con éxito!';
        console.log('Producto actualizado:', response);
        this.editingProduct = null;
        this.loadProductos();
        setTimeout(() => this.updateProductMessage = '', 3000);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        this.updateProductError = 'Error al actualizar producto. Por favor, inténtalo de nuevo.';
        if (err.error && err.error.error) {
          this.updateProductError = `Error: ${err.error.error}`;
        } else if (err.message) {
          this.updateProductError = `Error: ${err.message}`;
        } else {
          this.updateProductError = `Error desconocido al actualizar producto.`;
        }
      }
    });
  }

  deleteProduct(id: number | undefined): void {
    if (id === undefined || id === null) {
      console.error('ID de producto inválido para eliminar.');
      this.addProductError = 'ID de producto inválido para eliminar.';
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.addProductMessage = '';
      this.addProductError = '';

      this.productosService.deleteProduct(id).subscribe({
        next: (response) => {
          console.log('Producto eliminado:', response);
          this.loadProductos();
          this.addProductMessage = 'Producto eliminado con éxito!';
          setTimeout(() => this.addProductMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          this.addProductError = 'Error al eliminar producto. Por favor, inténtalo de nuevo.';
          if (err.error && err.error.error) {
            this.addProductError = `Error: ${err.error.error}`;
          } else if (err.message) {
            this.addProductError = `Error: ${err.message}`;
          } else {
            this.addProductError = `Error desconocido al eliminar producto.`;
          }
        }
      });
    }
  }
}