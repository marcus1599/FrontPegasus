import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';  // Corrigido o import do RouterModule
import { HomeComponent } from './pages/home/home.component';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

// Definindo as rotas diretamente no arquivo
const routes: Routes = [
  { path: '', component: HomeComponent },

];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, HeaderComponent, FooterComponent],  // Incluindo o RouterModule diretamente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pegasus';
}
