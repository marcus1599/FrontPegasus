import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showUserMenu = false; // Controle do menu dropdown
  user: { name: string; email: string; avatar:string } | null = null; // Dados do usuário
  userAvatar = 'assets/default-avatar.png'; // URL do avatar do usuário
  isAuthenticated = false; // Indica se o usuário está logado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Carrega informações do usuário autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.user = this.authService.currentUserValue;
      this.userAvatar = this.user?.avatar || 'assets/default-avatar.png'; // URL do avatar do usuário
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
    this.showUserMenu = false;
  }

}
