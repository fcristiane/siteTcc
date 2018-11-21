import { Component, OnInit } from '@angular/core';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { Perfil } from '../perfil/perfil.module';
import { Observable } from 'rxjs';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aprovar-projeto',
  templateUrl: './aprovar-projeto.component.html',
  styleUrls: ['./aprovar-projeto.component.css']
})
export class AprovarProjetoComponent implements OnInit {

  project: Projeto = {} as Projeto;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;
  
  constructor(private route: ActivatedRoute,
    private projetoService: ProjetoService,
    public perfilService: PerfilService,
    public router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projetoService.getProjetoById(id).subscribe((data) => {
        this.project = data[0];
      });
      console.log('!!!!!');
    }
  }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
  }

  salvar(project: Projeto) {
    this.projetoService.aprovar(project);
    this.router.navigate(['/home/todos-projetos']);
  }

  cancelar(){
    this.router.navigate(['/home/todos-projetos']);
  }

}
