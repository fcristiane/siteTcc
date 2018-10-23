import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Projeto } from '../../core/projetos/projeto.module';
import { Observable } from 'rxjs';
import { Perfil } from '../perfil/perfil.module';
import { ProjetoService } from '../../core/projetos/projeto.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export interface ProjetoId extends Projeto { id: string; }

@Component({
  selector: 'app-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss']
})
export class TodosProjetosComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  perfilDoc: AngularFirestoreDocument<Perfil>;
  perfilPro: Observable<Perfil>;

  project: Projeto = {} as Projeto;
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>
  projetosId: Observable<ProjetoId[]>;

  projetoDoc: AngularFirestoreDocument<Projeto>;
  projeto: Observable<Projeto>;

  showMessageError: boolean;

  constructor(public router: Router,private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService,
    private spinner: NgxSpinnerService
  ) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }

  }

  ngOnInit() {

    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();

    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
    
    if (userId == 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log("Retornou projetos");
      return this.projetos = this.projetoService.getProjetos();
    } else {
      console.log("Retornou por id")
      return this.projetos = this.projetoService.getByUserId();
    }
  }

  detalhes(projectId) {
    this.projetoDoc = this.db.doc('project/'+projectId);
    this.projeto = this.projetoDoc.valueChanges();
  }

  getProjetoById(project){
    
  }

  // getProjetoById() {
  //   this.projetosCollection = this.db.collection<Projeto>('project');
  //   this.projetos = this.projetosCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Projeto;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )

  // }

  aprovar(project: Projeto) {
    this.projetoService.aprovar(project);
  }

  reprovar(project: Projeto) {
    this.projetoService.reprovar(project);
  }

  reentrada(project: Projeto) {
    this.projetoService.reentrada(project);
  }

}