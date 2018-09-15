import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [
      AuthGuard
    ],
      children: [
        { path: 'novo-projeto', component: NovoProjetoComponent }
      ]
    },
    { path: 'login', component: LoginComponent },
  ];