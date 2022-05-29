import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  email = getAuth().currentUser?.email;

  user = getAuth().currentUser;

  imagen:any = []

  profileImage:any = "";

  widthNumber:number = 0;
  widthProgress:string = "";

  constructor(private storageService: StorageService, private auth: AuthService, private notifications: HotToastService) { }

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
          success: 'Se subió la imagen correctamente',
          loading: 'Subiendo imagen',
          error: 'Ha occurido un error'
        })).subscribe(() => {
          this.auth.newProfileImage(getAuth().currentUser?.photoURL)
        })
      })
    }
  }
}
