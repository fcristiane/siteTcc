import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
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
  

  showMessageError : boolean;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }

    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    this.projetos = this.projetosCollection.valueChanges();
  }

  ngOnInit() {
    this.showMessageError = false;
  }

  getProjetos() {
    this.projetosCollection = this.db.collection('project');
    this.projetos = this.projetosCollection.valueChanges()
  }

  permissao(){
    
  }

}
