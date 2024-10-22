import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
    
   }
   findaAll(){
    return [
      {_id:'0', title: 'Artigo 1', resume: 'Resumo do artigo 1' },
      {_id:'2', title: 'Artigo 2', resume: 'Resumo do artigo 2' },
      {_id:'3', title: 'Artigo 3', resume: 'Resumo do artigo 3' },
      {_id:'4', title: 'Artigo 4', resume: 'Resumo do artigo 4' }
    ];
  }
}
