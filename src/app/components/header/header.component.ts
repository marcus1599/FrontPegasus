import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  showUserMenu = false; // Controle do menu dropdown

  user: User | null = null; // Dados do usuário
  userAvatar = '/assets/guest.png'; // URL do avatar do usuário
  isAuthenticated = false; // Indica se o usuário está logado


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Carrega informações do usuário autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.authService.currentUser.subscribe(user => {
        console.log('User fetched:', user); // Verifica se o user está vindo corretamente
        if (user) {
          this.authService.getUserInfo(user.token).subscribe({
            next: (data) => {
              this.user = data;
              this.userAvatar = this.user?.avatar || '/assets/guest.png'; // URL do avatar do usuário
            },
            error: (err) => console.error('Erro ao carregar informações do usuário', err)
          });
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
    console.log('User:', this.user);
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
    this.showUserMenu = false;
  }
}
