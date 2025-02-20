import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL do backend para login
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    let storedUser: User | null = null;
    if (this.isLocalStorageAvailable()) {
      const userStr = localStorage.getItem('user');
      storedUser = userStr ? JSON.parse(userStr) : null;
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Verifica se localStorage está disponível
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  // Getter do usuário atual
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Métodos auxiliares para gerenciar o usuário
  private setUser(user: User): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('user', JSON.stringify(user));
      
    }
    this.currentUserSubject.next(user);
  }
  private setUserInfo(user: User): void {
    if (this.isLocalStorageAvailable()) {
    
      localStorage.setItem('userinfo', JSON.stringify(user));
    }
   
  }

  private clearUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  // Busca informações completas do usuário com base no token
  getUserInfo(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/auth/userinfo`, { headers });
  }

  // Realiza login e retorna um Observable<User>
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { email, senha: password }).pipe(
      tap(data => {
        if (data && data.token) {
          // Armazena apenas o token inicialmente
          this.setUser({ token: data.token });
        } else {
          throw new Error('Token não encontrado na resposta do login');
        }
      }),
      switchMap(data => this.getUserInfo(data.token)),
      tap(userInfo => {
        this.setUserInfo(userInfo);
        this.router.navigate(['/']);
      }),
      catchError(err => {
        console.error('Erro no login:', err);
        return throwError(err);
      })
    );
  }

  // Realiza login com Google e retorna um Observable<User>
  googleLogin(idToken: string): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/google-login`, { token: idToken }).pipe(
      tap(data => {
        if (data && data.token) {
          this.setUser({ token: data.token });
        } else {
          throw new Error('Token não encontrado na resposta do login com Google');
        }
      }),
      switchMap(data => this.getUserInfo(data.token)),
      tap(userInfo => {
        this.setUser(userInfo);
        this.router.navigate(['/']);
      }),
      catchError(err => {
        console.error('Erro no login com Google:', err);
        return throwError(err);
      })
    );
  }

  // Realiza logout
  logout(): void {
    this.clearUser();
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!(user && user.token);
  }

  // Cria cabeçalhos de autorização para requisições
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const user = this.currentUserValue;
    if (user && user.token) {
      headers = headers.set('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }

  // Realiza registro e retorna um Observable<any>
  register(username: string, email: string, password: string, biography: string): Observable<User> {
    const body = { username, email, password: password, biografia: biography };
    console.log('Registrando usuário:', body);
    return this.http.post<User>(`${this.apiUrl}/auth/register`, body).pipe(
      tap(() => this.router.navigate(['/login'])),
      catchError(err => {
        console.error('Erro no registro:', err);
        return throwError(err);
      })
    );
  }
}
