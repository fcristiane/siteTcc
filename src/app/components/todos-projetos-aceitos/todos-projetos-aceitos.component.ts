import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { Perfil } from '../perfil/perfil.module';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-todos-projetos-aceitos',
  templateUrl: './todos-projetos-aceitos.component.html',
  styleUrls: ['./todos-projetos-aceitos.component.scss']
})
export class TodosProjetosAceitosComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  projetos: Observable<Projeto[]>;

  projetoDoc: AngularFirestoreDocument<Projeto>;
  projeto: Observable<Projeto>;


  constructor(public router: Router, private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService,
    private spinner: NgxSpinnerService ) {
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
        /** spinner ends after 2 seconds */
        this.spinner.hide();
    }, 2000);

    if (userId === 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log('Retornou projetos');
      return this.projetos = this.projetoService.filterByAceitosTodos();
    } else {
      console.log('Retornou por id');
      return this.projetos = this.projetoService.filterByAceitos();
    }

  }

  detalhes(projectId) {
    this.projetoDoc = this.db.doc('project/' + projectId);
    this.projeto = this.projetoDoc.valueChanges();
  }


}
