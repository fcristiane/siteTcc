import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Projeto } from '../../core/projetos/projeto.module';
import { Observable } from 'rxjs';
import { Perfil } from '../perfil/perfil.module';
import { ProjetoService } from '../../core/projetos/projeto.service';

@Component({
  selector: 'app-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss']
})
export class TodosProjetosComponent implements OnInit {

  user = firebase.auth().currentUser;
  project: Projeto = {} as Projeto;
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>

  perfil: Perfil = {} as Perfil;
  perfilColection: AngularFirestoreCollection<Perfil>;
  perfils: Observable<Perfil[]>;

  projeto: Projeto = {} as Projeto;

  showMessageError: boolean;

  perfilDoc: AngularFirestoreDocument<Perfil>;
  perfilPro: Observable<Perfil>;

  constructor(private db: AngularFirestore, 
              private auth: AngularFireAuth, 
              private projetoService: ProjetoService
  ) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid)
    }
    
  }

  ngOnInit() {
    let userId = firebase.auth().currentUser.uid;
    this.perfilColection = this.db.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId));
    this.perfils = this.perfilColection.valueChanges();

    if (userId == 'WAJ7zsFtAUYq7qXv4tKNC6w9cnZ2') {
      console.log("Retornou projetos");
      return this.getProjetos();
    } else {
      console.log("Retornou por id")
      return this.getByUserId();
    }

  }

  getProjetoById(){
  }

   getProjetos(){
    this.projetosCollection = this.db.collection<Projeto>('project');
    return this.projetos = this.projetosCollection.valueChanges();
  //   return this.projetoService.getProjetos()
  //    .subscribe(
  //      projetos => {
  //        console.log(projetos);
  //        this.projetos = projetos
  //      }
  //    )
   }

  getByUserId(){
    let userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    console.log("Passou!");
    this.projetos = this.projetosCollection.valueChanges();
    // return this.projetoService.getByUserId()
    // .subscribe(
    //   projetos => {
    //     console.log(projetos);
    //     this.projetos = projetos
    //   }
    // )
  }

}
