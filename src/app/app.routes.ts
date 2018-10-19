import { Routes } from '@angular/router';
import { AuthGuard } from './core/users/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NovoProjetoComponent } from './components/novo-projeto/novo-projeto.component';
import { InfoComponent } from './components/info/info.component';
import { TodosProjetosComponent } from './components/todos-projetos/todos-projetos.component';
import { ProjetoDetalheComponent } from './components/projeto-detalhe/projeto-detalhe.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { TodosProjetosAnaliseComponent } from './components/todos-projetos-analise/todos-projetos-analise.component';
import { TodosProjetosAceitosComponent } from './components/todos-projetos-aceitos/todos-projetos-aceitos.component';
import { TodosProjetosReprovadosComponent } from './components/todos-projetos-reprovados/todos-projetos-reprovados.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [
      AuthGuard
    ],
      children: [
        { path: 'novo-projeto', component: NovoProjetoComponent },
        { path: '', component: InfoComponent },
        { path: 'todos-projetos', component: TodosProjetosComponent },
        { path: 'todos-analise', component: TodosProjetosAnaliseComponent },
        { path: 'todos-aceitos', component: TodosProjetosAceitosComponent },
        { path: 'todos-reprovados', component: TodosProjetosReprovadosComponent },
        { path: 'perfil', component: PerfilComponent },
        { path: 'projeto-detalhe', component: ProjetoDetalheComponent }
      ]
    },
    { path: 'login', component: LoginComponent },
  ];