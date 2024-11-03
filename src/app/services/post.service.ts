import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = '/Postagem/v1/';

  constructor(private httpclient: HttpClient){

  }

   findaAll(){
    return this.httpclient.get<Post[]>(this.API).pipe(
      first(),
      tap(posts => console.log(posts)));
  }

  save(record : Post){

    return this.httpclient.post<Post>(`${this.API}/adicionar`,record).pipe(first());
  }
 
}
