import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showUserMenu = false; // Controle do menu dropdown
  user: { name: string; email: string; avatar: string } | null = null; // Dados do usuário
  userAvatar = '/assets/guest.png'; // URL do avatar do usuário
  isAuthenticated = false; // Indica se o usuário está logado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Carrega informações do usuário autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (this.isAuthenticated) {
      const user = this.authService.currentUserValue; // Obtém o usuário
      console.log('User fetched:', user); // Verifique se o user está vindo corretamente
      if (user) {
        this.user = user; // Atribui os dados do usuário
        this.userAvatar = this.user?.avatar || '/assets/guest.png'; // URL do avatar do usuário
      } else {
        console.error('User is undefined');
      }
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    // Proteja a chamada para garantir que user não seja null
    console.log(this.user?.email); // Exibe o email do usuário, se existir
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
    this.showUserMenu = false;
  }
}
