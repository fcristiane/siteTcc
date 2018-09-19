import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NovoProjeto } from '../novo-projeto/novo-projeto.module';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss']
})
export class TodosProjetosComponent implements OnInit {

  projetosCollection: AngularFirestoreCollection<NovoProjeto>;
  project: Observable<NovoProjeto[]>;

  user = firebase.auth().currentUser;
  showMessageError : boolean;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }
  }

  ngOnInit() {
    this.showMessageError = false;
  }

  getProjetos() {
    this.projetosCollection = this.db.collection('project');
    this.project = this.projetosCollection.valueChanges()
  }

}
