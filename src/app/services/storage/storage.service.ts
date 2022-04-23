import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();

  constructor() { }

  async uploadImage(name: any, imgBase64: any){
    
    try{
      let respuesta = await this.storageRef.child(String('users/' + name)).putString(imgBase64, 'data_url');
      console.log(respuesta)
      return await respuesta.ref.getDownloadURL();
    }catch(err){
      console.log(err);
      return null;
    }

  }
}
