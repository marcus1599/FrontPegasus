import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL do backend para login
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Verifica se o localStorage está disponível antes de inicializar
    const user = this.isLocalStorageAvailable()
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null;

    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Verifica se o localStorage está disponível
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  // Retorna o usuário atual
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Realiza login
  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email: email, senha: password })
      .subscribe(data => {
        if (data && data.token) {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('user', JSON.stringify(data));
          }
          this.currentUserSubject.next(data);
          this.router.navigate(['/']);
        } else {
          console.error('Token não encontrado na resposta do login');
        }
      });
  }

  // Realiza login com Google
  googleLogin(idToken: string) {
    return this.http.post<any>(`${this.apiUrl}/google-login`, { token: idToken })
      .subscribe(data => {
        if (data && data.token) {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('user', JSON.stringify(data));
          }
          this.currentUserSubject.next(data);
          this.router.navigate(['/']);
        } else {
          console.error('Token não encontrado na resposta do login com Google');
        }
      });
  }

  // Realiza logout
  logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redireciona para o login
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  // Adiciona o cabeçalho de autorização com o token JWT
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const user = this.currentUserValue;
    if (user && user.token) {
      headers = headers.set('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }

  // Realiza registro
  register(username: string, email: string, password: string, biography: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      username: username,
      email: email,
      senha: password,
      biografia: biography
    }).pipe(
      tap(() => this.router.navigate(['/login'])) // Navega para a página de login após o registro
    );
  }
}
