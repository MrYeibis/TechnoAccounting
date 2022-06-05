import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      map( user => {
        if (!user){
          this.router.navigate(['/login'])
          return false;
        } if (user.email == 'yeibisrojas@hotmail.com'){
          return true;
        }if (user.email == 'fersungfloo@gmail.com'){
          return true;
        } if (user.email == 'angiesofiaespinosa@gmail.com'){
          return true;
        } else {
          this.router.navigate(['/login'])
          return false;
        }
      })
    );
  }
  
}
