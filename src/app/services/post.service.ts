import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = 'https://pegasoapi.onrender.com/Postagem/v1'; 

  constructor(private httpclient: HttpClient) { }

  // Método para pegar todos os posts
  findAll() {
    return this.httpclient.get<Post[]>(this.API).pipe(
      first()
    );
  }

  // Método para salvar um post
  save(record: Post) {
    
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
