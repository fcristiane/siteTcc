import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Projeto } from './projeto.module';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { PerfilService } from '../perfils/perfil.service';
import { Perfil } from 'src/app/components/perfil/perfil.module';
import { Router } from '@angular/router';
import * as emailjs from 'emailjs-com';


@Injectable({
  providedIn: 'root'
})
export class ProjetoService implements OnInit {

  novoProjeto: Projeto = {} as Projeto;
  projetosCollection: AngularFirestoreCollection<Projeto>;
  projetos: Observable<Projeto[]>;
  projeto: Projeto = {} as Projeto;
  showMessageError: boolean;

  perfils: Observable<Perfil[]>;
  user = firebase.auth().currentUser;

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    public perfilService: PerfilService,
    public router: Router) { }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
  }

  getProjetos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '<', 5));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  getByUserId(): Observable<Projeto[]> {
    const userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('userId', '==', userId));
    console.log('Passou!');
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

  create(formulario) {
    const today: number = Date.now();
    const id = this.db.createId();
    formulario.dataCadastro = today;
    formulario.id = id;
    formulario.userId = this.user.uid;
    formulario.situacao = 1;
    this.db.collection<Projeto>('project').doc(id).set(formulario).then((success) => {
      console.log(success);
      console.log('Salvo');
      let templateParams = {
        name: 'James',
        notes: 'Check this out!'
      }
      emailjs.init('user_Nqf2Vk94Xmq9jo3YBWrMf');
      emailjs.send('gmail', 'template_8RGNGecJ', templateParams)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
          console.log('FAILED...', err);
        });

    }).catch((erro) => {
      console.log(erro);
      console.log('Erro ao salvar');
    });
  }

  emEdicao(novoProjeto: Projeto) {
    if (novoProjeto.id == null && novoProjeto.userId == null) {
      const id = this.db.createId();
      novoProjeto.id = id;
      const today: number = Date.now();
      novoProjeto.dataCadastro = today;
      novoProjeto.userId = this.user.uid;
      novoProjeto.situacao = 5;
      this.db.collection<Projeto>('project').doc(id).set(novoProjeto).then((success) => {
        console.log(success);
        console.log('Salvo');
      }).catch((erro) => {
        console.log(erro);
        console.log('Erro ao salvar');
      });
    } else {
      const today: number = Date.now();
      novoProjeto.dataCadastro = today;
      novoProjeto.situacao = 5;
      this.db.collection<Projeto>('project').doc(novoProjeto.id).update(novoProjeto).then((success) => {
        console.log(success);
        console.log('Salvo');
      }).catch((erro) => {
        console.log(erro);
        console.log('Erro ao salvar');
      });
    }
  }

  enviarComentario(project: Projeto) {
    const today: number = Date.now();
    project.dataComentario = today;
    project.atualizacaoEditado = today;
    project.situacao = 5;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Comentário enviado!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao enviar comentário!!!');
    });
  }

  updateEdicao(project: Projeto) {
    if (project.id == null && project.userId == null) {
      const id = this.db.createId();
      project.id = id;
      const today: number = Date.now();
      project.dataCadastro = today;
      project.userId = this.user.uid;
      project.situacao = 5;
      this.db.collection<Projeto>('project').doc(id).set(project).then((success) => {
        console.log(success);
        console.log('Salvo');
      }).catch((erro) => {
        console.log(erro);
        console.log('Erro ao salvar');
      });
    } else {
      const today: number = Date.now();
      project.dataCadastro = today;
      project.situacao = 5;
      this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
        console.log(success);
        console.log('Salvo');
      }).catch((erro) => {
        console.log(erro);
        console.log('Erro ao salvar');
      });
    }
  }

  update(project: Projeto) {
    const today: number = Date.now();
    project.dataCadastro = today;
    project.situacao = 1;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      console.log('Update success');
      this.router.navigate(['/home/todos-projetos']);
    }).catch((erro) => {
      console.log(erro);
    });
  }

  delete(id: string) {
    this.db.collection<Projeto>('project').doc(id).delete().then((success) => {
      console.log(success);
      alert('Projeto deletado com sucesso!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao deletar projeto!!!');
    });
    console.log(this.novoProjeto);
  }

  aprovar(project: Projeto) {
    const today: number = Date.now();
    project.atualizacaoAprovado = today;
    project.situacao = 2;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto aceito com sucesso!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao aceitar projeto!!!');
    });
  }

  reprovar(project: Projeto) {
    const today: number = Date.now();
    project.atualizacaoIndeferido = today;
    project.situacao = 3;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto reprovado!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro ao reprovar projeto!!!');
    });
  }

  reentrada(project: Projeto) {
    const today: number = Date.now();
    project.atualizacaoEditado = today;
    project.situacao = 1;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto movido para reanálise!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro!!!');
    });
  }

  cancelado(project: Projeto) {
    const today: number = Date.now();
    project.atualizacaoCancelado = today;
    project.situacao = 5;
    this.db.collection<Projeto>('project').doc(project.id).update(project).then((success) => {
      console.log(success);
      alert('Projeto movido para cancelado!!!');
    }).catch((erro) => {
      console.log(erro);
      alert('Erro!!!');
    });
  }

  filterByAceitos(): Observable<Projeto[]> {
    const userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 2).where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByAnalise(): Observable<Projeto[]> {
    const userId = firebase.auth().currentUser.uid;
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 1).where('userId', '==', userId));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByReprovados(): Observable<Projeto[]> {
    const userId = firebase.auth().currentUser.uid;
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

  filterByEditando(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 5));
    return this.projetos = this.projetosCollection.valueChanges();
  }

  filterByEditandoTodos(): Observable<Projeto[]> {
    this.projetosCollection = this.db.collection<Projeto>('project', ref => ref.where('situacao', '==', 5));
    return this.projetos = this.projetosCollection.valueChanges();
  }

}
