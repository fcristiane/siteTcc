import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../core/projetos/projeto.module';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from '../../core/projetos/projeto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  registerForm: FormGroup;
  submitted = false;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private projetoService: ProjetoService, private formBuilder: FormBuilder) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid);
    }

  }

  ngOnInit() {
    this.showMessageError = false;
    this.registerForm = this.formBuilder.group({
      nomeAtv: ['', Validators.required],
      curso: ['', Validators.required],
      coordenador: ['', Validators.required],
      responsavel: ['', Validators.required],
      campus: ['', Validators.required],
      areaAtuacao: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      periodoDe: ['', Validators.required],
      periodoAte: ['', Validators.required],
      local: ['', Validators.required],
      diasDaSemana: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      areaTematica: ['', Validators.required],
      ministrante: ['', Validators.required],
      cpf: ['', Validators.required, Validators.minLength(11)],


    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    alert('SUCESSO!!')
  }

  getLista() {
    this.db.collection<Projeto>('project').valueChanges().subscribe((data: Projeto[]) => {
      this.novoProjetoLista = data;
      console.log(this.novoProjeto);
    })
  }

  save() {
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

  update(novoProjeto: Projeto) {
    this.novoProjeto.situacao = 3;
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
