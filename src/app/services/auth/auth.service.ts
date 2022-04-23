import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, getAuth} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFire:any;

  public email: any = '';
  private email$: Subject<any>;

  public picture: any = '';
  private picture$: Subject<any>;

  constructor(private auth: Auth) {
    this.email = '';
    this.email$ = new Subject();

    this.picture = ''
    this.picture$ = new Subject();

    auth.onAuthStateChanged(user => {
      if (user) {
        this.userFire = user;
      }else {
        this.userFire = null;
      }
    })
    console.log(this.userFire);
  }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  updateProfile(user: any, displayName: string, photoURL: any){
    return from(updateProfile(user, {displayName, photoURL}));
  }

  logout(){
    return from(this.auth.signOut());
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));

  }

  resetPassword(email: string){
    return from(sendPasswordResetEmail(this.auth, email));
  }

  getPicture(){
    this.picture = getAuth().currentUser?.photoURL;
    console.log(this.picture)
    this.picture$.next(this.picture);
  }

  getPicture$(){
    return this.picture$.asObservable();
  }
}
