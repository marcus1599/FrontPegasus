import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrigido o nome 'styleUrl' para 'styleUrls'
})
export class RegisterComponent {

  username = ''; 
  email = '';
  password = '';
  biography = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log(this.username, this.email, this.password, this.biography);
    this.authService.register(this.username, this.email, this.password, this.biography).subscribe({
      next: () => {
        console.log("Registro bem-sucedido");
        this.router.navigate(['/login']);
      },
      error: (err) => console.error("Erro no registro", err)
    });
  }
}
