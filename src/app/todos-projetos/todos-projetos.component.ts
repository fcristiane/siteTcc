import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Projeto } from '../novo-projeto/projeto.module';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss']
})
export class TodosProjetosComponent implements OnInit {

  project: Projeto = {} as Projeto;
  user = firebase.auth().currentUser;

  private projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>;

  showMessageError : boolean;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }

    this.projetosCollection = db.collection<Projeto>('project');
    this.projetos = this.projetosCollection.valueChanges();
  }

  ngOnInit() {
    this.showMessageError = false;
  }

  getProjetos() {
    this.projetosCollection = this.db.collection('project');
    this.projetos = this.projetosCollection.valueChanges()
  }

}
