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
      palestra: [''],
      areasTematicas: this.buildAreasTematicas(),
      areaAtuacao: ['', Validators.required],
      classificacoes: this.buildClassificacao(),
      ministrante: [''],
      cpf: [''],
      docenteInstituicao: [''],
      funcaoCargo: [''],
      titulacao: [''],
      publicoAlvo: [''],
      numPessoasEnvolvidas: [''],
      tipoParceria: [''],
      nomeInstituicaoApoio: [''],
      ministrante2: [''],
      cpf2: [''],
      funcaoCargo2: [''],
      titulacao2: [''],
      docenteInstituicao2: [''],
      addMinistrante3: [''],
      ministrante3: [''],
      cpf3: [''],
      docenteInstituicao3: [''],
      funcaoCargo3: [''],
      titulacao3: [''],
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
      docenteEnvolvido1: [''],
      addDocente2: [''],
      docenteEnvolvido2: [''],
      addDocente3: [''],
      docenteEnvolvido3: [''],
      cursoDocenteEnvolvido1: [''],
      cursoDocenteEnvolvido2: [''],
      cursoDocenteEnvolvido3: [''],
      funcaoDocenteEnvolvido1: [''],
      funcaoDocenteEnvolvido2: [''],
      funcaoDocenteEnvolvido3: [''],
      discenteEnvolvido1: [''],
      addDiscente2: [''],
      discenteEnvolvido2: [''],
      addDiscente3: [''],
      discenteEnvolvido3: [''],
      cursoDiscenteEnvolvido1: [''],
      cursoDiscenteEnvolvido2: [''],
      cursoDiscenteEnvolvido3: [''],
      periodoDiscenteEnvolvido1: [''],
      periodoDiscenteEnvolvido2: [''],
      periodoDiscenteEnvolvido3: [''],
      matriculaDiscenteEnvolvido1: [''],
      matriculaDiscenteEnvolvido2: [''],
      matriculaDiscenteEnvolvido3: [''],
      cronograma: [''],
      receitaIncricao: [''],
      receitaInicio: [''],
      receitaTermino: [''],
      receitaNumMinInsc: [''],
      receitaNumMinInscTotal: [''],
      receitaNumMaxInsc: [''],
      receitaNumMaxInscTotal: [''],
      valorDiscenteDoscente: [''],
      outrosValores: [''],
      especificacaoRecursos1: [''],
      quantidadeRecursos1: [''],
      valorUnitarioRecursos1: [''],
      totalRecursos1: [''],
      especificacaoRecursos2: [''],
      quantidadeRecursos2: [''],
      valorUnitarioRecursos2: [''],
      totalRecursos2: [''],
      especificacaoRecursos3: [''],
      quantidadeRecursos3: [''],
      valorUnitarioRecursos3: [''],
      totalRecursos3: [''],
      especificacaoRecursos4: [''],
      quantidadeRecursos4: [''],
      valorUnitarioRecursos4: [''],
      totalRecursos4: [''],
      totalDespesas: [''],
      addMinistrante2: [''],      
    });

     this.formulario.valueChanges.subscribe(console.log);

  }

  get f() {return this.formulario.controls; }

  onSubmit() {
    console.log(this.formulario);
    this.submitted = true;
    if(this.formulario.invalid) {
      console.log('Formulário inválido');
      alert('Preencha todos os campos obrigatórios!');
      return;
    } 
      this.novoProjeto = this.formulario.value;
      this.salvar(this.novoProjeto);
      alert('Sucesso!');
    
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

  // varificaValidTouched(campo){
  //   return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  // }

  // aplicaCssErro(campo){
  //   return {
  //     'has-error': this.varificaValidTouched(campo),
  //     'has-feedback': this.varificaValidTouched(campo)
  //   }
  // }

  buildClassificacao() {
    const values = this.classificacoes.map(v => new FormControl(false));
    return this.fb.array(values);
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
