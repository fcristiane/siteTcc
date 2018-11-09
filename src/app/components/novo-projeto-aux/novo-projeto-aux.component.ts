import { Component, OnInit } from '@angular/core';
import { Perfil } from '../perfil/perfil.module';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  submitted = false;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private projetoService: ProjetoService,
    public perfilService: PerfilService,
    public router: Router,
    private fb: FormBuilder) {
    if (firebase.auth().currentUser != null) {
      console.log('user id: ' + firebase.auth().currentUser.uid);
    }
  }

  classificacoes = ['Concurso', 'Curso', 'Encontro', 'Exposição', 'Jornada', 'Oficina', 'Palestra', 'Projeto', 'Publicação', 'Seminario', 'Simpósio', 'Viagem', 'Workshop'];
  areasTematicas = ['Comunicação', 'Cultura', 'Direitos Humanos', 'Educação', 'Meio Ambiente', 'Saúde', 'Tecnologia', 'Trabalho'];
  diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
    this.showMessageError = false;

    this.formulario = this.fb.group({
      nomeAtv: ['', Validators.required],
      curso: ['', Validators.required],
      responsavel: ['', Validators.required],
      coordenador: ['', Validators.required],
      palestra: ['', Validators.required],
      areasTematicas: this.buildAreasTematicas(),
      areaAtuacao: ['', Validators.required],
      classificacoes: this.buildClassificacao(),
      ministrante: ['', Validators.required],
      cpf: ['', Validators.minLength(11)],
      docenteInstituicao: ['', Validators.required],
      funcaoCargo: ['', Validators.required],
      titulacao: ['', Validators.required],
      publicoAlvo: ['', Validators.required],
      numPessoasEnvolvidas: ['', Validators.required],
      tipoParceria: ['', Validators.required],
      nomeInstituicaoApoio: ['', Validators.required],
      addMinistrante2: ['', Validators.required],
      ministrante2: ['', Validators.required],
      cpf2: ['', Validators.required],
      funcaoCargo2: ['', Validators.required],
      titulacao2: ['', Validators.required],
      docenteInstituicao2: ['', Validators.required],
      addMinistrante3: ['', Validators.required],
      ministrante3: ['', Validators.required],
      cpf3: ['', Validators.required],
      docenteInstituicao3: ['', Validators.required],
      funcaoCargo3: ['', Validators.required],
      titulacao3: ['', Validators.required],
      periodoDe: ['', Validators.required],
      periodoAte: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      diasDaSemana: this.buildDiasDaSemana(),
      cargaHoraria: ['', Validators.required],
      campus: ['', Validators.required],
      local: ['', Validators.required],
      objetivos: ['', Validators.required],
      justificativa: ['', Validators.required],
      metodologiaProcedimento: ['', Validators.required],
      docenteEnvolvido1: ['', Validators.required],
      addDocente2: ['', Validators.required],
      docenteEnvolvido2: ['', Validators.required],
      addDocente3: ['', Validators.required],
      docenteEnvolvido3: ['', Validators.required],
      cursoDocenteEnvolvido1: ['', Validators.required],
      cursoDocenteEnvolvido2: ['', Validators.required],
      cursoDocenteEnvolvido3: ['', Validators.required],
      funcaoDocenteEnvolvido1: ['', Validators.required],
      funcaoDocenteEnvolvido2: ['', Validators.required],
      funcaoDocenteEnvolvido3: ['', Validators.required],
      discenteEnvolvido1: ['', Validators.required],
      addDiscente2: ['', Validators.required],
      discenteEnvolvido2: ['', Validators.required],
      addDiscente3: ['', Validators.required],
      discenteEnvolvido3: ['', Validators.required],
      cursoDiscenteEnvolvido1: ['', Validators.required],
      cursoDiscenteEnvolvido2: ['', Validators.required],
      cursoDiscenteEnvolvido3: ['', Validators.required],
      periodoDiscenteEnvolvido1: ['', Validators.required],
      periodoDiscenteEnvolvido2: ['', Validators.required],
      periodoDiscenteEnvolvido3: ['', Validators.required],
      matriculaDiscenteEnvolvido1: ['', Validators.required],
      matriculaDiscenteEnvolvido2: ['', Validators.required],
      matriculaDiscenteEnvolvido3: ['', Validators.required],
      cronograma: ['', Validators.required],
      receitaIncricao: ['', Validators.required],
      receitaInicio: ['', Validators.required],
      receitaTermino: ['', Validators.required],
      receitaNumMinInsc: ['', Validators.required],
      receitaNumMinInscTotal: ['', Validators.required],
      receitaNumMaxInsc: ['', Validators.required],
      receitaNumMaxInscTotal: ['', Validators.required],
      valorDiscenteDoscente: ['', Validators.required],
      outrosValores: ['', Validators.required],
      especificacaoRecursos1: ['', Validators.required],
      quantidadeRecursos1: ['', Validators.required],
      valorUnitarioRecursos1: ['', Validators.required],
      totalRecursos1: ['', Validators.required],
      especificacaoRecursos2: ['', Validators.required],
      quantidadeRecursos2: ['', Validators.required],
      valorUnitarioRecursos2: ['', Validators.required],
      totalRecursos2: ['', Validators.required],
      especificacaoRecursos3: ['', Validators.required],
      quantidadeRecursos3: ['', Validators.required],
      valorUnitarioRecursos3: ['', Validators.required],
      totalRecursos3: ['', Validators.required],
      especificacaoRecursos4: ['', Validators.required],
      quantidadeRecursos4: ['', Validators.required],
      valorUnitarioRecursos4: ['', Validators.required],
      totalRecursos4: ['', Validators.required],
      totalDespesas: ['', Validators.required],
    });

    // this.formulario.valueChanges.subscribe(console.log);

  }

  get f() {return this.formulario.controls; }

  onSubmit() {
    console.log(this.formulario);
    this.submitted = true;
    if(this.formulario.invalid) {
      return;
    }
    alert('Sucesso!')
    // if (this.formulario.valid) {
    //   this.projetoService.create(this.formulario);
    //   this.formulario.reset();
    // } else {
    //   console.log('Formulário inválido!');
    //   Object.keys(this.formulario.controls).forEach(campo => {
    //   console.log(campo);
    //   const controle = this.formulario.get(campo);
    //   controle.markAsDirty();
    //   });
    // }
    
  }

  varificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.varificaValidTouched(campo),
      'has-feedback': this.varificaValidTouched(campo)
    }
  }

  buildClassificacao() {
    const values = this.classificacoes.map(v => new FormControl(false));
    return this.fb.array(values, this.requiredMinCheckbox(1));
  }

  buildAreasTematicas() {
    const values = this.areasTematicas.map(v => new FormControl(false));
    return this.fb.array(values);
  }

  buildDiasDaSemana() {
    const values = this.diasDaSemana.map(v => new FormControl(false));
    return this.fb.array(values);
  }
  // get f() { return this.registerForm.controls; }

  requiredMinCheckbox(min = 1){
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current: total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;    
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
