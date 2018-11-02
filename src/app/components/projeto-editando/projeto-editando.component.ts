import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Perfil } from '../perfil/perfil.module';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

export interface ProjetoId extends Projeto { id: string; }

@Component({
  selector: 'app-projeto-editando',
  templateUrl: './projeto-editando.component.html',
  styleUrls: ['./projeto-editando.component.scss']
})
export class ProjetoEditandoComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  perfilDoc: AngularFirestoreDocument<Perfil>;
  perfilPro: Observable<Perfil>;

  project: Projeto = {} as Projeto;
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>;
  projetosId: Observable<ProjetoId[]>;

  projetoDoc: AngularFirestoreDocument<Projeto>;
  projeto: Observable<Projeto>;

  showMessageError: boolean;

  constructor(public router: Router, private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService,
    private spinner: NgxSpinnerService) {
    if (firebase.auth().currentUser != null) {
      console.log('user id: ' + firebase.auth().currentUser.uid);
    }

  }

  ngOnInit() {
    const userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();

    this.spinner.show();

    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2500);

    if (userId === 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log('Retornou projetos');
      return this.projetos = this.projetoService.filterByEditandoTodos();
    } else {
      console.log('Retornou por id');
      return this.projetos = this.projetoService.filterByEditando();
    }
  }

}
