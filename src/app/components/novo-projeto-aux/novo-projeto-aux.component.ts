import { Component, OnInit } from '@angular/core';
import { Perfil } from '../perfil/perfil.module';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-projeto-aux',
  templateUrl: './novo-projeto-aux.component.html',
  styleUrls: ['./novo-projeto-aux.component.scss']
})
export class NovoProjetoAuxComponent implements OnInit {

  user = firebase.auth().currentUser;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;

  formulario: FormGroup;

  novoProjeto: Projeto = {} as Projeto;
  novoProjetoLista: Array<Projeto> = [];
  showMessageError: boolean;

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService,
    public perfilService: PerfilService,
    public router: Router,
    private formBuilder: FormBuilder) {
    if (firebase.auth().currentUser != null) {
      console.log('user id: ' + firebase.auth().currentUser.uid);
    }
  }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
    this.showMessageError = false;

    this.formulario = this.formBuilder.group({
      nome: [null],
      responsavel: [null],
      nomeAtv: [null],
      coordenador: [null],
      palestra: [null],
      areaTematica: [null],
      curso: [null],
      areaAtuacao: [null],
      classificacao: [null],
      ministrante: [null],
      cpf: [null],
      docenteInstituicao: [null],
      funcaoCargo: [null],
      titulacao: [null],
      publicoAlvo: [null],
      numPessoasEnvolvidas: [null],
      tipoParceria: [null],
      nomeInstituicaoApoio: [null],
      addMinistrante2: [null],
      ministrante2: [null],
      cpf2: [null],
      funcaoCargo2: [null],
      titulacao2: [null],
      docenteInstituicao2: [null],
      addMinistrante3: [null],
      ministrante3: [null],
      cpf3: [null],
      docenteInstituicao3: [null],
      funcaoCargo3: [null],
      titulacao3: [null],
      periodoDe: [null],
      periodoAte: [null],
      horaInicio: [null],
      horaFim: [null],
      diasDaSemana: [null],
      cargaHoraria: [null],
      campus: [null],
      local: [null],
      objetivos: [null],
      justificativa: [null],
      metodologiaProcedimento: [null],
      docenteEnvolvido1: [null],
      addDocente2: [null],
      docenteEnvolvido2: [null],
      addDocente3: [null],
      docenteEnvolvido3: [null],
      cursoDocenteEnvolvido1: [null],
      cursoDocenteEnvolvido2: [null],
      cursoDocenteEnvolvido3: [null],
      funcaoDocenteEnvolvido1: [null],
      funcaoDocenteEnvolvido2: [null],
      funcaoDocenteEnvolvido3: [null],
      discenteEnvolvido1: [null],
      addDiscente2: [null],
      discenteEnvolvido2: [null],
      addDiscente3: [null],
      discenteEnvolvido3: [null],
      cursoDiscenteEnvolvido1: [null],
      cursoDiscenteEnvolvido2: [null],
      cursoDiscenteEnvolvido3: [null],
      periodoDiscenteEnvolvido1: [null],
      periodoDiscenteEnvolvido2: [null],
      periodoDiscenteEnvolvido3: [null],
      matriculaDiscenteEnvolvido1: [null],
      matriculaDiscenteEnvolvido2: [null],
      matriculaDiscenteEnvolvido3: [null],
      cronograma: [null],
      receitaIncricao: [null],
      receitaInicio: [null],
      receitaTermino: [null],
      receitaNumMinInsc: [null],
      receitaNumMinInscTotal: [null],
      receitaNumMaxInsc: [null],
      receitaNumMaxInscTotal: [null],
      valorDiscenteDoscente: [null],
      outrosValores: [null],
      especificacaoRecursos1: [null],
      quantidadeRecursos1: [null],
      valorUnitarioRecursos1: [null],
      totalRecursos1: [null],
      especificacaoRecursos2: [null],
      quantidadeRecursos2: [null],
      valorUnitarioRecursos2: [null],
      totalRecursos2: [null],
      especificacaoRecursos3: [null],
      quantidadeRecursos3: [null],
      valorUnitarioRecursos3: [null],
      totalRecursos3: [null],
      especificacaoRecursos4: [null],
      quantidadeRecursos4: [null],
      valorUnitarioRecursos4: [null],
      totalRecursos4: [null],
      totalDespesas: [null],
    });

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

  onSubmit() {
    console.log(this.formulario);
    this.projetoService.create(this.formulario);
    this.formulario.reset();
  }

  getLista() {
    this.db.collection<Projeto>('project').valueChanges().subscribe((data: Projeto[]) => {
      this.novoProjetoLista = data;
      console.log(this.novoProjeto);
    });
  }

  salvar(novoProjeto: Projeto) {
    console.log(novoProjeto);
    this.projetoService.create(novoProjeto);
    this.router.navigate(['/home/todos-projetos']);
  }

  update(novoProjeto: Projeto) {
    this.projetoService.update(novoProjeto);
  }

  delete(id: string) {
    this.projetoService.delete(id);
  }

  emEdicao(novoProjeto: Projeto) {
    this.projetoService.emEdicao(novoProjeto);
    this.router.navigate(['/home/todos-projetos']);
  }
}
