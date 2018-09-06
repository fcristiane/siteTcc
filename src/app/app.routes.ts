import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { LoginComponent } from './login/login.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,
      children: [
        { path: 'novo-projeto', component: NovoProjetoComponent }
      ]
    },
    { path: 'login', component: LoginComponent },
  ];