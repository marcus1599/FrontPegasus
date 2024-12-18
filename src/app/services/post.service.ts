import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = 'http://localhost:8080/Postagem/v1';  // Certifique-se de que o endpoint está correto

  constructor(private httpclient: HttpClient) { }

  // Método para pegar todos os posts
  findAll() {
    return this.httpclient.get<Post[]>(this.API).pipe(
      first()
    );
  }

  // Método para salvar um post
  save(record: Post) {
    return this.httpclient.post<Post>(`${this.API}/adicionar`, record, { headers: this.getHeaders() }).pipe(first());
  }

  // Método para definir os headers
  private getHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token; // Pegue o token do objeto 'user'
  
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }
}
