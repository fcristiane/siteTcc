import { Component, OnInit } from '@angular/core';
import { NovoProjeto } from './novo-projeto.module';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {

  novoProjeto: NovoProjeto = {} as NovoProjeto;
  novoProjetoLista: Array<NovoProjeto> = [];
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
    this.db.collection<NovoProjeto>('project').valueChanges().subscribe((data: NovoProjeto[]) => {
      this.novoProjetoLista = data;
      console.log(this.novoProjeto);
    })
  }

  criar() {

    let id = this.db.createId();
    this.novoProjeto.id = id;
    this.novoProjeto.userId = this.user.uid;
    this.db.collection<NovoProjeto>('project').doc(id).set(this.novoProjeto).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
  }

  update(novoProjeto: NovoProjeto) {

    this.db.collection<NovoProjeto>('project').doc(novoProjeto.id).update(novoProjeto).then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
  }

  delete(id: string) {
    this.db.collection<NovoProjeto>('project').doc(id).delete().then((success) => {
      console.log(success)
    }).catch((erro) => {
      console.log(erro)
    })
    console.log(this.novoProjeto)
  }

}
