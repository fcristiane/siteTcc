import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../core/projetos/projeto.module';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from '../../core/projetos/projeto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perfil } from '../perfil/perfil.module';
import { Observable } from 'rxjs';
import { PerfilService } from 'src/app/core/perfils/perfil.service';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;

  novoProjeto: Projeto = {} as Projeto;
  novoProjetoLista: Array<Projeto> = [];
  showMessageError: boolean;

  registerForm: FormGroup;
  submitted = false;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private projetoService: ProjetoService, private formBuilder: FormBuilder, public perfilService: PerfilService) {
    if (firebase.auth().currentUser != null) {
      console.log("user id: " + firebase.auth().currentUser.uid);
    }

  }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
    this.showMessageError = false;
    // this.registerForm = this.formBuilder.group({
    //   nomeAtv: ['', Validators.required],
    //   curso: ['', Validators.required],
    //   coordenador: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    //   horaInicio: ['', Validators.required],
    //   horaFim: ['', Validators.required],
    //   periodoDe: ['', Validators.required],
    //   periodoAte: ['', Validators.required],
    //   local: ['', Validators.required],
    //   cargaHoraria: ['', Validators.required],
    //   ministrante: ['', Validators.required],
    //   cpf: ['', Validators.required],
    //   tipoParceria: ['', Validators.required],
    //   titulacao: ['', Validators.required]


    // });
  }

  // get f() { return this.registerForm.controls; }


  onSubmit(novoProjeto) {

    // this.submitted = true;

    // if (this.registerForm.invalid) {
    //   alert('Preencha todos os campos corretamente!');
    //   return;
    // }else {
    //   this.salvar();
    // }

    alert('Sucesso!');
    this.salvar(novoProjeto);

  }

  getLista() {
    this.db.collection<Projeto>('project').valueChanges().subscribe((data: Projeto[]) => {
      this.novoProjetoLista = data;
      console.log(this.novoProjeto);
    })
  }

  salvar(novoProjeto : Projeto) {
    this.projetoService.create(novoProjeto);
  }

  update(novoProjeto: Projeto) {
    this.projetoService.update(novoProjeto);
  }

  delete(id: string) {
    this.projetoService.delete(id);
  }

}
