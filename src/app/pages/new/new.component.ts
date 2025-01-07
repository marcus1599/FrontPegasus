import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})

export class NewComponent {

  constructor(private service: PostService) {}

  post: Post = {
    nome: '',
    descricao: '',
    data_criacao: '',
    imagem: null 
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.post.imagem = input.files[0]; // Armazena o arquivo da imagem
      console.log('Imagem selecionada:', this.post.imagem);
    }
  }

  onSubmit() {

    if (!this.post.data_criacao) {
      this.post.data_criacao = new Date().toISOString(); // Formato ISO da data
    }

    this.service.save(this.post).subscribe(result => {
      console.log(result); 
    });
    console.log('Post criado:', this.post);

    
    this.post = { nome: '', descricao: '', data_criacao: '' }; 
  }
}
