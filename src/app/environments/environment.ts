// src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyADKFJpW9Ge0oLitSOU1DtY_6FUzMDuKLQ",
    authDomain: "gimnasio-bd67b.firebaseapp.com",
    projectId: "gimnasio-bd67b",
    storageBucket: "gimnasio-bd67b.firebasestorage.app",
    messagingSenderId: "194670851159",
    appId: "1:194670851159:web:bf683b36f7e0c9bd8b5f12"
  },
  //backendUrl: 'http://127.0.0.1:5000'
  backendUrl: 'http://localhost:5000',
  // Nueva URL base para imágenes si las sirves desde un directorio específico en Flask
  // Si Flask sirve los assets desde /assets, usa esta ruta.
  // ¡Asegúrate de que esta URL base coincida con cómo Flask sirve tus archivos estáticos!
  assetsUrlBase: 'http://localhost:5000/assets'

};