import { Routes } from '@angular/router';
import { NewComponent } from './pages/new/new.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'new', component: NewComponent }, ];
