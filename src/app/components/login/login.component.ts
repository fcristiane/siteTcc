import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Login } from '../../core/users/user.model';
import { AuthService } from '../../core/users/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginObject: Login = {} as Login;

  loginForm: FormGroup;
  errorMessage: string;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  login() {
    this.authService.login(this.loginObject)
    .then(res => {
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  logout() {
    this.authService.logout();
  }

}
