import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Projeto } from '../novo-projeto/projeto.module';
import { Observable } from 'rxjs';
import { Perfil } from '../perfil/perfil.module';


@Component({
  selector: 'app-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss']
})
export class TodosProjetosComponent implements OnInit {

  user = firebase.auth().currentUser;
  project: Projeto = {} as Projeto;
  projetos: Observable<Projeto[]>;
  private projetosCollection: AngularFirestoreCollection<Projeto>;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;
  private perfilColection: AngularFirestoreCollection<Perfil>;


  showMessageError: boolean;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }
  }

  ngOnInit() {
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
    let x = this.db.collection<Perfil>('perfil').doc('permissao');
    
    if (x) {
      console.log("Retornou By Id" + x)
      console.log("Retornou By Id")
      return this.getByUserId();
    } else {
      console.log("Falhou")
      return this.getProjeto();
    }

  }

  getByUserId() {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    this.projetos = this.projetosCollection.valueChanges();

    // let x = this.db.collection<Projeto>('project').doc(project.id);
    // return x;
    // this.projetosCollection = this.db.collection('project');
    // this.projetos = this.projetosCollection.valueChanges()
  }

  getProjeto() {
    this.projetosCollection = this.db.collection<Projeto>('project');
    this.projetos = this.projetosCollection.valueChanges();


    // let x = this.db.collection<Projeto>('project').doc(project.id);
    // return x;
    // this.projetosCollection = this.db.collection('project');
    // this.projetos = this.projetosCollection.valueChanges()
  }

}
