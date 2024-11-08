import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';  // URL do backend para login
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Retorna o usuário atual
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Realiza login
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .subscribe(data => {
        // Certifique-se de que 'data' contém 'token'
        if (data && data.token) {
          localStorage.setItem('user', JSON.stringify(data));
          this.currentUserSubject.next(data);
          this.router.navigate(['/dashboard']); // Redireciona para o dashboard
        } else {
          // Tratar o caso em que o token não está presente na resposta
          console.error('Token não encontrado na resposta do login');
        }
      });
  }
  

  // Realiza logout
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redireciona para o login
  }

  // Verifica se o usuário está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  // Adiciona o cabeçalho de autorização com o token JWT
  private getAuthHeaders() {
    let headers = new HttpHeaders();
    const user = this.currentUserValue;
    if (user && user.token) {
      headers = headers.set('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }
}
