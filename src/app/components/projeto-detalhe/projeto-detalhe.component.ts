import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/core/projetos/projeto.service';
import { Projeto } from 'src/app/core/projetos/projeto.module';
import { Observable } from 'rxjs';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { Perfil } from '../perfil/perfil.module';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-projeto-detalhe',
  templateUrl: './projeto-detalhe.component.html',
  styleUrls: ['./projeto-detalhe.component.scss']
})
export class ProjetoDetalheComponent implements OnInit {

  project: Projeto = {} as Projeto;

  perfil: Perfil = {} as Perfil;
  perfils: Observable<Perfil[]>;

  constructor(
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
    public perfilService: PerfilService
  ) {
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

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('pdf-projeto.pdf');
    });
  }



  // getProjeto(){
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.projetoService.getProjetoById(id)
  //     .subscribe(project => this.project = project);
  // }

}
