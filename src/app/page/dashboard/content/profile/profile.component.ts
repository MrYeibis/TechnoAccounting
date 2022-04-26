import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';
import { StorageService } from '../../../../services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email = getAuth().currentUser?.email;

  user = getAuth().currentUser;

  imagen:any = []

  profileImage:any = "";

  constructor(private storageService: StorageService, private auth: AuthService, private notifications: HotToastService) { }

  ngOnInit(): void {
    
  }

  uploadFile(event: any) {
    let file = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      this.imagen.push(reader.result);
      this.storageService.uploadImage(this.email + '_' + Date.now(), reader.result).then(urlImage => {
        this.auth.updateProfile(this.user, '', urlImage).pipe(this.notifications.observe({
          success: 'Imagen subida con exito',
          loading: 'La imagen se está subiendo',
          error: 'Ha occurido un error'
        })).subscribe(() => {
          this.auth.newProfileImage(getAuth().currentUser?.photoURL)
          console.log(this.auth.profileImage)
        })
      })
    }
  }
}
