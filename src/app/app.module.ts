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
    NgxSpinnerModule
    
  ],
  providers: [UserService, AuthGuard, ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
