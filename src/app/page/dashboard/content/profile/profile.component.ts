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

  widthNumber:number = 0;
  widthProgress:string = "";

  constructor(private storageService: StorageService, public auth: AuthService, private notifications: HotToastService, public crud: DbCrudService) { }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    let file = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      this.imagen.push(reader.result);
      this.storageService.uploadImage(this.email, reader.result).then(urlImage => {
        this.auth.updateProfile(this.user, '', urlImage).pipe(this.notifications.observe({
          success: 'Se subió la foto de perfil correctamente',
          loading: 'Subiendo foto de perfil',
          error: 'Ha occurido un error'
        })).subscribe(() => {
          this.auth.newProfileImage(getAuth().currentUser?.photoURL)
        })
      })
    }
  }
}
