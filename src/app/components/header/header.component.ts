import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  showUserMenu = false; // Controle do menu dropdown
  user: { name: string; email: string; avatar: string } | null = null; // Dados do usuário
  userAvatar = '/assets/guest.png'; // URL do avatar do usuário
  isAuthenticated = false; // Indica se o usuário está logado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Carrega informações do usuário autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.authService.currentUser.subscribe(user => {
        console.log('User fetched:', user); // Verifique se o user está vindo corretamente
        if (user) {
          this.user = {
            name: user.name || '',
            email: user.email || '',
            avatar: user.avatar || '/assets/guest.png'
          }; // Atribui os dados do usuário
          this.userAvatar = this.user?.avatar || '/assets/guest.png'; // URL do avatar do usuário
        } else {
          console.error('User is undefined');
        }
      });
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    // Proteja a chamada para garantir que user não seja null
    // Exibe os dados do usuário
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
    this.showUserMenu = false;
  }
}
