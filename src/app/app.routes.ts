import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { InfoComponent } from './info/info.component';
import { TodosProjetosComponent } from './todos-projetos/todos-projetos.component';
import { PerfilComponent } from './perfil/perfil.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [
      AuthGuard
    ],
      children: [
        { path: 'novo-projeto', component: NovoProjetoComponent },
        { path: 'info', component: InfoComponent },
        { path: 'todos-projetos', component: TodosProjetosComponent },
        { path: 'perfil', component: PerfilComponent }
      ]
    },
    { path: 'login', component: LoginComponent },
  ];