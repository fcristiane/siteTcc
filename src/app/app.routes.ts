import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,
      children: [
        { path: 'novo-projeto', component: NovoProjetoComponent }
      ]
    },
    // { path: 'login', component: LoginComponent },
  ];