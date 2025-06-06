import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth'; // <--- ¡Asegúrate de que signInWithEmailAndPassword y signOut estén aquí!

import {
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = environment.backendUrl;
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private afAuth: Auth) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  login(email: string, password: string): Observable<any> {
    // Aquí usamos la función signInWithEmailAndPassword, pasándole la instancia de Auth (afAuth)
    return from(signInWithEmailAndPassword(this.afAuth, email, password)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        if (user) {
          return from(user.getIdToken()).pipe(
            switchMap(idToken => {
              return this.http.post<any>(`${this.backendUrl}/login`, { idToken: idToken });
            })
          );
        } else {
          throw new Error('No se pudo obtener el usuario de Firebase después de la autenticación.');
        }
      })
    );
  }

  logout(): Observable<void> {
    // Aquí usamos la función signOut, pasándole la instancia de Auth (afAuth)
    return from(signOut(this.afAuth)).pipe(
      map(() => {
        this.currentUser = null;
      })
    );
  }

  getCurrentUserToken(): Promise<string | null> {
    return this.currentUser ? this.currentUser.getIdToken() : Promise.resolve(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}