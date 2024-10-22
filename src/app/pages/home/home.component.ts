import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { NgFor } from '@angular/common';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { RecomendedComponent } from '../../components/recomended/recomended.component';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CardComponent,NgFor,AvisoComponent,RecomendedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cards : Post[]= [
  ];
  recomends = [
    { title: 'Artigo 1' },
    { title: 'Artigo 2' },
    { title: 'Artigo 3' },
    { title: 'Artigo 4' }
  ];
  postService : PostService;
  constructor(){
    this.postService = new PostService();
    this.cards = this.postService.findaAll();
  }

}
