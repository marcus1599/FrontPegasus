import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { NgFor, CommonModule } from '@angular/common';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { RecomendedComponent } from '../../components/recomended/recomended.component';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { catchError, Observable, of } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, 
    CardComponent, 
    NgFor, 
    CommonModule, 
    AvisoComponent, 
    RecomendedComponent,
   
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cards: Observable<Post[]>;

  recomends = [
    { title: 'Artigo 1' },
    { title: 'Artigo 2' },
    { title: 'Artigo 3' },
    { title: 'Artigo 4' }
  ];

  constructor(private postService: PostService) {
    this.cards = this.postService.findaAll()
    .pipe(
      catchError(error=>{
        console.log(error);
        return of([])
      })

    );
  }

  ngOnInit(): void {
    // Se necessário, manipular os dados aqui
  }
}
