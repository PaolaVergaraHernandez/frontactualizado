// src/app/app.routes.ts
import { Routes } from '@angular/router';

import {
  AdminProductosComponent,
} from './components/admin-productos/admin-productos.component';
import {
  ClasesComponent,
} from './components/clases/clases.component'; // Ya importado, correcto
import {
  FormularioComponent,
} from './components/formulario/formulario.component'; // Ya importado, correcto
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlanesComponent } from './components/planes/planes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent }, // Asegúrate que esta línea solo esté una vez
  { path: 'clases', component: ClasesComponent }, // <-- ¡MUEVE ESTA LÍNEA AQUÍ!
  { path: 'formulario', component: FormularioComponent },
  { path: 'planes', component: PlanesComponent },


  {
    path: 'admin/productos',
    component: AdminProductosComponent,
    canActivate: [AuthGuard]
  },

  // ¡IMPORTANTE!: La ruta wildcard (**) siempre debe ser la ÚLTIMA en el array de rutas.
  // Cualquier ruta definida después de ella NUNCA se alcanzará.
  { path: '**', redirectTo: '' }
];  