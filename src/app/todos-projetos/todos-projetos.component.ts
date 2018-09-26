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
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>;

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  projeto: Projeto = {} as Projeto;

  showMessageError: boolean;

  perfilDoc: AngularFirestoreDocument<Perfil>;
  perfilPro: Observable<Perfil>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }
  }

  ngOnInit() {
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
    
    if (userId == 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log("Retornou projetos")
      return this.getProjeto();
    } else {
      console.log("Retornou por id")
      return this.getByUserId();
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

  update(projeto: Projeto) {
    this.projeto.situacao = 2;
    this.db.collection<Projeto>('project').doc(projeto.id).update(projeto.situacao).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
  }

}
