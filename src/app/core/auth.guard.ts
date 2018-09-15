import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  
  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe(data => {
        debugger
        if(data){
          return resolve(true);
        } else{
          return resolve(false);
        }
      })
    })
  }
  
}
