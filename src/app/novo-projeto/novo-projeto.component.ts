import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto.module';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {

  novoProjeto: Projeto = {} as Projeto;
  novoProjetoLista: Array<Projeto> = [];
  user = firebase.auth().currentUser;
  showMessageError : boolean;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid);
    }
  }

  ngOnInit() {
    this.showMessageError = false;
  }

  getLista() {
    this.db.collection<Projeto>('project').valueChanges().subscribe((data: Projeto[]) => {
      this.novoProjetoLista = data;
      console.log(this.novoProjeto);
    })
  }

  criar() {

    let id = this.db.createId();
    this.novoProjeto.id = id;
    this.novoProjeto.userId = this.user.uid;
    this.db.collection<Projeto>('project').doc(id).set(this.novoProjeto).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
  }

  update(novoProjeto: Projeto) {

    this.db.collection<Projeto>('project').doc(novoProjeto.id).update(novoProjeto).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
  }

  delete(id: string) {
    this.db.collection<Projeto>('project').doc(id).delete().then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
    console.log(this.novoProjeto)
  }

}
