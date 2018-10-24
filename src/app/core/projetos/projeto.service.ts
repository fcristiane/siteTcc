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
    private auth: AngularFireAuth) { }

  getProjetos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project');
    return this.projetos = this.projetosCollection.valueChanges();
  }

  getByUserId(): Observable<Projeto[]> {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    console.log("Passou!");
    return this.projetos = this.projetosCollection.valueChanges();
    // let x = this.db.collection<Projeto>('project').doc(project.id);
    // return x;
    // this.projetosCollection = this.db.collection('project');
    // this.projetos = this.projetosCollection.valueChanges()
  }

  getProjetoById(id) {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('id', '==', id));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  create() {
    let id = this.db.createId();
    this.novoProjeto.id = id;
    this.novoProjeto.userId = this.user.uid;
    this.novoProjeto.situacao = 1;
    this.db.collection<Projeto>('project').doc(id).set(this.novoProjeto).then((success) => {
      console.log(success);
      console.log('Salvo');
    }).catch((erro) => {
      console.log(erro);
      console.log('Erro ao salvar')
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
  
  delete(id: string) {
    this.db.collection<Projeto>('project').doc(id).delete().then((success) => {
      console.log(success);
      alert('Projeto deletado com sucesso!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao deletar projeto!!!');
    })
    console.log(this.novoProjeto)
  }

  aprovar(project: Projeto) {
    project.situacao = 2;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto aceito com sucesso!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao aceitar projeto!!!');
    })
  }

  reprovar(project: Projeto) {
    project.situacao = 3;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto reprovado!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao reprovar projeto!!!');
    })
  }

  reentrada(project: Projeto) {
    project.situacao = 1;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto movido para reanálise!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro!!!');
    })
  }

  filterByAceitos(): Observable<Projeto[]> {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 2).where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByAnalise(): Observable<Projeto[]> {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 1).where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByReprovados(): Observable<Projeto[]> {
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 3).where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByAceitosTodos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 2));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByAnaliseTodos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 1));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByReprovadosTodos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 3));
    return this.projetos = this.projetosCollection.valueChanges();
  }

}
