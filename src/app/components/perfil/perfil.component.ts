import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from './perfil.module';
import { Observable } from 'rxjs';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;
  today: number = Date.now();

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, public perfilService: PerfilService) {
    if (firebase.auth().currentUser != null) {
      console.log("User id: " + firebase.auth().currentUser.uid);
      console.log("Email: " + firebase.auth().currentUser.email);
    }
  }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();

  }

  salvar(perfil: Perfil) {
    console.log(perfil);
    this.perfilService.salvar(perfil);
  }

  update(perfil: Perfil){
    console.log(perfil);
    this.perfilService.update(perfil);
  }

}
