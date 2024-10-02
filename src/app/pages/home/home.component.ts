import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { NgFor } from '@angular/common';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { RecomendedComponent } from '../../components/recomended/recomended.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CardComponent,NgFor,AvisoComponent,RecomendedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cards = [
    { title: 'Artigo 1', content: 'Resumo do artigo 1' },
    { title: 'Artigo 2', content: 'Resumo do artigo 2' },
    { title: 'Artigo 3', content: 'Resumo do artigo 3' },
    { title: 'Artigo 4', content: 'Resumo do artigo 4' }
  ];
  recomends = [
    { title: 'Artigo 1' },
    { title: 'Artigo 2' },
    { title: 'Artigo 3' },
    { title: 'Artigo 4' }
  ];

}
