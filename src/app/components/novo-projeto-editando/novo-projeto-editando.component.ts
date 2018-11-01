import { Component, OnInit } from '@angular/core';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { Perfil } from '../perfil/perfil.module';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-projeto-editando',
  templateUrl: './novo-projeto-editando.component.html',
  styleUrls: ['./novo-projeto-editando.component.scss']
})
export class NovoProjetoEditandoComponent implements OnInit {

  project: Projeto = {} as Projeto;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;

  constructor(
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
    public perfilService: PerfilService,
    public router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projetoService.getProjetoById(id).subscribe((data) => {
        this.project = data[0];
      })
      console.log("!!!!!")
    }
  }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
  }

  update(projeto: Projeto) {
    console.log(projeto);
    this.projetoService.update(projeto)
    this.router.navigate(['/home/todos-projetos']);
  }

  emEdicao(projeto: Projeto) {
    this.projetoService.updateEdicao(projeto);
    this.router.navigate(['/home/todos-projetos']);
  }

  finalizar(project: Projeto) {
    this.projetoService.update(project);
  }

}
