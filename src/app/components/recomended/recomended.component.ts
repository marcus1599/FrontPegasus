import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recomended',
  standalone: true,
  imports: [],
  templateUrl: './recomended.component.html',
  styleUrl: './recomended.component.css'
})
export class RecomendedComponent {

  @Input() title: string = '';
  @Input() imgUrl: string = '';


}
