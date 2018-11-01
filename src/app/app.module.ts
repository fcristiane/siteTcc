import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FeatherIconsPipe } from './feather-pipe';
import { UserService } from './core/users/user.service';
import { AuthGuard } from './core/users/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NovoProjetoComponent } from './components/novo-projeto/novo-projeto.component';
import { TodosProjetosComponent } from './components/todos-projetos/todos-projetos.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { ProjetoDetalheComponent } from './components/projeto-detalhe/projeto-detalhe.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProjetoService } from './core/projetos/projeto.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CpfPipe } from './cpf.pipe';
import { Error404Component } from './components/error404/error404.component';
import { TodosProjetosAceitosComponent } from './components/todos-projetos-aceitos/todos-projetos-aceitos.component';
import { TodosProjetosReprovadosComponent } from './components/todos-projetos-reprovados/todos-projetos-reprovados.component';
import { TodosProjetosAnaliseComponent } from './components/todos-projetos-analise/todos-projetos-analise.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfilService } from './core/perfils/perfil.service';
import { ManualDoUsuarioComponent } from './components/manual-do-usuario/manual-do-usuario.component';
import {NgxMaskModule} from 'ngx-mask';
import { FilterPipe } from './filter.pipe';
import { NovoProjetoAuxComponent } from './components/novo-projeto-aux/novo-projeto-aux.component';
import { ProjetoEditandoComponent } from './components/projeto-editando/projeto-editando.component';
import { NovoProjetoEditandoComponent } from './components/novo-projeto-editando/novo-projeto-editando.component';
import { NovoProjetoEditandoAuxComponent } from './components/novo-projeto-editando-aux/novo-projeto-editando-aux.component';
import { EnviarComentarioComponent } from './components/enviar-comentario/enviar-comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeatherIconsPipe,
    NovoProjetoComponent,
    LoginComponent,
    InfoComponent,
    TodosProjetosComponent,
    PerfilComponent,
    ProjetoDetalheComponent,
    CpfPipe,
    Error404Component,
    TodosProjetosAnaliseComponent,
    TodosProjetosAceitosComponent,
    TodosProjetosReprovadosComponent,
    ManualDoUsuarioComponent,
    FilterPipe,
    NovoProjetoAuxComponent,
    ProjetoEditandoComponent,
    NovoProjetoEditandoComponent,
    NovoProjetoEditandoAuxComponent,
    EnviarComentarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule, // for database
    SlimLoadingBarModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot()
    
  ],

  providers: [UserService, AuthGuard, ProjetoService, PerfilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
