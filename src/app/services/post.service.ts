import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { first } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = environment.apiUrl; 

  constructor(private httpclient: HttpClient) { }

  // Método para pegar todos os posts
  findAll() {
    return this.httpclient.get<Post[]>(`${this.API}/Postagem/v1`).pipe(
      first()
    );
  }
  findByUserID(id: number) {
    return this.httpclient.get<Post[]>(`${this.API}/Postagem/v1/usuario/${id}`).pipe(
      first()
    );

  }

  // Método para salvar um post
  save(record: Post) {
    
    if (!record.data_criacao) {
      record.data_criacao = new Date().toISOString(); // Adiciona a data de criação, se não existir
    }
    console.log(this.getHeaders());
    return this.httpclient.post<Post>(`${this.API}/Postagem/v1/adicionar`, record, { headers: this.getHeaders() }).pipe(first());
  }

  updatePost(post: Post) {
    return this.httpclient.put<Post>(`${this.API}/Postagem/v1/Update/${post.id_postagem}`, post, { headers: this.getHeaders() }).pipe(first());
  }

  deletePost(id: number) {
    return this.httpclient.delete<void>(`${this.API}/Postagem/v1/${id}`, { headers: this.getHeaders() }).pipe(first());
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
