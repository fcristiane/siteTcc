import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Perfil } from '../components/perfil/perfil.module';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;
  private perfilColection: AngularFirestoreCollection<Perfil>;

  constructor(private db: AngularFirestore) {
    if (firebase.auth().currentUser != null) {
      console.log("User id: " + firebase.auth().currentUser.uid);
   }
  }

  ngOnInit(){
    this.getPerfil();
  }

  getPerfil(): Observable<Perfil[]>{
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
    return this.perfils;
  }
}
