import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from './perfil.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;
  private perfilColection: AngularFirestoreCollection<Perfil>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("User id: " + firebase.auth().currentUser.uid);
    }

    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
  }

  ngOnInit() {
  }

  

  getPerfil() {
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
    return this.perfils;
  }

  salvar() {
    let id = this.db.createId();
    this.perfil.id = id;
    this.perfil.userId = this.user.uid;
    this.db.collection<Perfil>('perfil').doc(id).set(this.perfil).then((sucess) => {
      console.log(sucess)
    }).catch((erro) => {
      console.log(erro)
    })
  }

}
