import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/users/auth.service';
import { PerfilService } from 'src/app/core/perfil.service';
import { Observable } from 'rxjs';
import { Perfil } from '../perfil/perfil.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  perfils: Observable<Perfil[]>;

  constructor(public router: Router, public authService: AuthService, public perfilService: PerfilService) { }

  ngOnInit() {
    this.perfils = this.perfilService.getPerfil();
  }

  logout() {
    this.authService.logout();
    console.log("Deslogando...");
  }


}
