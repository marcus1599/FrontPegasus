import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  post = {
    title: '',
    summary: '',
    image: null as File | null // Atualizando o tipo da propriedade
  };

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.post.image = file; // Armazena a imagem selecionada
    }
  }

  onSubmit() {
    // Aqui você pode enviar os dados do post para a API ou manipulá-los conforme necessário
    
    console.log('Post criado:', this.post);
    // Limpa os campos após o envio, se necessário
    this.post = { title: '', summary: '', image: null }; // Reinicia os campos
  }
}
