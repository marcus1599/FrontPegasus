import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { first } from 'rxjs';

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
    // Aqui você pode definir manualmente a data_criacao se necessário
    if (!record.data_criacao) {
      record.data_criacao = new Date().toISOString(); // Adiciona a data de criação, se não existir
    }

    return this.httpclient.post<Post>(`${this.API}/adicionar`, record, { headers: this.getHeaders() }).pipe(first());
  }

  // Método para definir os headers
  private getHeaders(): HttpHeaders {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token; // Pegue o token do objeto 'user'

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
