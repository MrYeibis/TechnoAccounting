import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  public data: any = [];
  public amount: number = 1;
  public unitPrice: number = 1;
  public employee: string = "";
  public event:any = "";

  file:any = []

  new = new FormGroup({
    accountant: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    urlFile: new FormControl('', [Validators.required])
  })


  constructor(private storageService: StorageService, private crud: DbCrudService, private notifications: HotToastService) { }

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      console.log(this.data);
    })
    this.crud.getData('accountant', this.crud.employee, '/business/' + this.crud.codeE + '/reports');
    this.employee = this.crud.employee;
  }

  getEvent(event: any){
    this.event = event;
    this.new.controls['urlFile'].setValue('.')
  }

  uploadFile(event: any) {
    let file = event.target.files
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      setTimeout(()=>{this.notifications.info('Subiendo el informe, espere un momento')}, 300) 
      this.file.push(reader.result);
      this.storageService.uploadFile(Date(), reader.result).then(urlFile => {
        this.new.controls['urlFile'].setValue(urlFile);
        this.crud.addData(this.new.value, '/business/' + this.crud.codeE + '/reports');
        setTimeout(()=>{this.crud.getData('accountant', this.crud.employee, '/business/' + this.crud.codeE + '/reports')}, 200)
      }).catch((err) => {
        this.notifications.error('Error en el registro');
      });
    }
  }
}
