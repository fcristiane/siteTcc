import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Projeto } from './projeto.module';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  novoProjeto: Projeto = {} as Projeto;
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>;
  projeto: Projeto = {} as Projeto;
  showMessageError: boolean;

  user = firebase.auth().currentUser;


  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  getProjetos() {
    this.projetosCollection = this.db.collection<Projeto>('project');
    return this.projetos = this.projetosCollection.valueChanges();
  }

  getByUserId() {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
    // let x = this.db.collection<Projeto>('project').doc(project.id);
    // return x;
    // this.projetosCollection = this.db.collection('project');
    // this.projetos = this.projetosCollection.valueChanges()
  }

  create() {
    let id = this.db.createId();
    this.novoProjeto.id = id;
    this.novoProjeto.userId = this.user.uid;
    this.novoProjeto.situacao = 1;
    this.db.collection<Projeto>('project').doc(id).set(this.novoProjeto).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
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
