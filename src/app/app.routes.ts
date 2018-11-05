import { Routes } from '@angular/router';
import { AuthGuard } from './core/users/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NovoProjetoComponent } from './components/novo-projeto/novo-projeto.component';
import { InfoComponent } from './components/info/info.component';
import { TodosProjetosComponent } from './components/todos-projetos/todos-projetos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { TodosProjetosAnaliseComponent } from './components/todos-projetos-analise/todos-projetos-analise.component';
import { TodosProjetosAceitosComponent } from './components/todos-projetos-aceitos/todos-projetos-aceitos.component';
import { TodosProjetosReprovadosComponent } from './components/todos-projetos-reprovados/todos-projetos-reprovados.component';
import { ManualDoUsuarioComponent } from './components/manual-do-usuario/manual-do-usuario.component';
import { ProjetoDetalheComponent } from './components/projeto-detalhe/projeto-detalhe.component';
import { ProjetoEditandoComponent } from './components/projeto-editando/projeto-editando.component';
import { NovoProjetoEditandoComponent } from './components/novo-projeto-editando/novo-projeto-editando.component';
import { EnviarComentarioComponent } from './components/enviar-comentario/enviar-comentario.component';
import { NovoProjetoAuxComponent } from './components/novo-projeto-aux/novo-projeto-aux.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [
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
      { path: 'projeto-detalhe/:id', component: ProjetoDetalheComponent },
      { path: 'manual-do-usuario', component: ManualDoUsuarioComponent },
      { path: 'projeto-editando', component: ProjetoEditandoComponent },
      { path: 'novo-projeto-editando/:id', component: NovoProjetoEditandoComponent },
      { path: 'enviar-comentario/:id', component: EnviarComentarioComponent },
      { path: 'novo-projeto-aux', component: NovoProjetoAuxComponent }

    ]
  },
  { path: 'login', component: LoginComponent },
];
