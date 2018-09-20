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

  perfil: Perfil = {} as Perfil;
  user = firebase.auth().currentUser;

  private perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    if (firebase.auth().currentUser != null) {
      console.log("User id: " + firebase.auth().currentUser.uid);
    }
    
    this.perfilColection = db.collection<Perfil>('perfil');
    this.perfils = this.perfilColection.valueChanges();
  }

  ngOnInit() {
  }

  

  // getPerfil(userId: string) {
  //   if (firebase.auth().currentUser.uid == ){
  //     return this.perfilColection.valueChanges();
  //   }
  // }

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
