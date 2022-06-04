import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.currentUser$.pipe(
        map( user => {
          if (!user){
            this.router.navigate(['/landing'])
            return false;
          } if(user.email == 'yeibisrojas@hotmail.com'){
            this.router.navigate(['/admin'])
            return true;
          } else {
            this.router.navigate(['/dashboard'])
            return true;
          }
        })
      );
  }
  
}
