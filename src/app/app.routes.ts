import { Routes } from '@angular/router';
import { NewComponent } from './pages/new/new.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new', component: NewComponent, canActivate: [AuthGuard] }, // Protegendo a rota '/new'
];
