import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../perfil/perfil.module';
import { AuthService } from 'src/app/core/users/auth.service';
import { PerfilService } from 'src/app/core/perfils/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  perfils: Observable<Perfil[]>;

  constructor(public router: Router, public authService: AuthService, public perfilService: PerfilService) { }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
  }

}
