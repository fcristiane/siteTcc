import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Perfil } from '../../components/perfil/perfil.module';
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
  }

  getPerfil(): Observable<Perfil[]>{
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();
    return this.perfils;
  }

  salvar(perfil: Perfil) {
    let today: number = Date.now();
    let id = this.db.createId();
    perfil.dataAtualizacao = today;
    perfil.email = this.user.email;
    perfil.id = id;
    perfil.userId = this.user.uid;
    this.db.collection<Perfil>('perfil').doc(id).set(this.perfil).then((sucess) => {
      console.log(sucess);
      console.log('Atualizado com sucesso');
    }).catch((erro) => {
      console.log(erro);
      console.log('Erro ao atualizar');
    })
  }

  update(perfil: Perfil){
    let today: number = Date.now();
    perfil.dataAtualizacao = today;
    perfil.email = this.user.email;
    this.db.collection<Perfil>('perfil').doc(perfil.id).update(perfil).then((sucess) => {
      console.log(sucess);
      alert('Atualizado com sucesso!!')
    }).catch((erro) => {
      console.log(erro);
      alert('Ocorreu algum erro!!')
    })
  }

}
