import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, getAuth} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFire:any;

  profileImage:any = "";
  profileImage$: Subject<any>

  constructor(private auth: Auth) {
    this.profileImage = "";
    this.profileImage$ = new Subject();

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

  newProfileImage(profileImage: any){
    this.profileImage = profileImage;
    this.profileImage$.next(this.profileImage);
  }

  newProfileImage$(): Observable<any>{
    return this.profileImage$.asObservable();
  }
}
