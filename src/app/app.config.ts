import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http'; // Para hacer peticiones HTTP
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
// Importaciones de Firebase
import {
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app'; // <--- initializeApp aquí
import {
  getAuth,
  provideAuth,
} from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// Importa tu configuración de entorno
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Habilita HttpClient para toda la app

    // Configuración de Firebase para Angular 19 (Standalone Providers)
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Correcta inicialización
    provideAuth(() => getAuth()) // Provee el servicio de autenticación
  ]
};