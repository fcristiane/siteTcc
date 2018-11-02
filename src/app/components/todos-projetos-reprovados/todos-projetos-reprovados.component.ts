import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Perfil } from '../perfil/perfil.module';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';


@Component({
  selector: 'app-todos-projetos-reprovados',
  templateUrl: './todos-projetos-reprovados.component.html',
  styleUrls: ['./todos-projetos-reprovados.component.scss']
})
export class TodosProjetosReprovadosComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  projetos: Observable<Projeto[]>;

  projetoDoc: AngularFirestoreDocument<Projeto>;
  projeto: Observable<Projeto>;


  constructor(public router: Router, private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService, ) {
    if (firebase.auth().currentUser != null) {
      console.log('user id: ' + firebase.auth().currentUser.uid);
    }
  }

  ngOnInit() {

    const userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();

    if (userId === 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log('Retornou projetos');
      return this.projetos = this.projetoService.filterByReprovadosTodos();
    } else {
      console.log('Retornou por id');
      return this.projetos = this.projetoService.filterByReprovados();
    }

  }

  detalhes(projectId) {
    this.projetoDoc = this.db.doc('project/' + projectId);
    this.projeto = this.projetoDoc.valueChanges();
  }

  reentrada(project: Projeto) {
    this.projetoService.reentrada(project);
  }

}
