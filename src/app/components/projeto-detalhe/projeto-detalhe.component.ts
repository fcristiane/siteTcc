import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projeto-detalhe',
  templateUrl: './projeto-detalhe.component.html',
  styleUrls: ['./projeto-detalhe.component.scss']
})
export class ProjetoDetalheComponent implements OnInit {

  project : Projeto = {} as Projeto;

  constructor(
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.projetoService.getProjetoById(id).subscribe((data) => {
        this.project = data[0];
      })
      console.log("!!!!!")
    }
   }

  ngOnInit() {
    
    
  }

  // getProjeto(){
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.projetoService.getProjetoById(id)
  //     .subscribe(project => this.project = project);
  // }

}
