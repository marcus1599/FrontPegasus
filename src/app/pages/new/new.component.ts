import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})

export class NewComponent {


  constructor(private service: PostService) {}

 
  post = {
    id_postagem:'',
    nome: '',
    descricao: '',
   
  };

  onImageSelected(event: Event) {
   
  }

  onSubmit() {
    // Aqui você pode enviar os dados do post para a API ou manipulá-los conforme necessário

    this.service.save(this.post).subscribe(result=>console.log(result));
    console.log('Post criado:', this.post);
    // Limpa os campos após o envio, se necessário
    this.post = {  id_postagem:'',nome: '', descricao: '' }; // Reinicia os campos
  }
}
