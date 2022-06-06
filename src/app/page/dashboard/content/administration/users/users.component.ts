import { Component, OnInit } from '@angular/core';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public data: any = [];
  public codeE: any = "";
  public dataHere: boolean = false;

  constructor(public crud: DbCrudService) {}
  
  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      this.dataHere = true;
    })
    this.crud.getData('codeE', this.crud.codeE, '/users' );
  }

  select(id: string, name: string, surname: string, rank: string){
    this.crud.idUser = id;
    this.crud.nameUser = name;
    this.crud.surnameUser = surname;
    this.crud.rankUser = rank
  }

}
