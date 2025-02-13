import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})

export class NewComponent {

  constructor(private router: Router,private service: PostService) {}

  
  post: Post = {
    nome: '',
    descricao: '',
    data_criacao: '',
    usuario_id_usuario: 1,
    imagems: null 
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.post.imagems = input.files[0]; // Armazena o arquivo da imagem
      console.log('Imagem selecionada:', this.post.imagems);
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
    this.router.navigate(['/myposts']);
    
    
    this.post = { nome: '', descricao: '', data_criacao: '',usuario_id_usuario: 0, imagems: null }; // Limpa o formulário
  }
}
