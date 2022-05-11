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

  constructor(private crud: DbCrudService) {}
  
  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      console.log(this.data);
    })
    this.crud.getData('codeE', this.crud.codeE, '/users' );
  }

  select(id: string, name: string, surname: string, rank: string){
    this.crud.idUser = id;
    this.crud.nameUser = name;
    this.crud.surnameUser = surname;
    this.crud.rankUser = rank
  }

  deleteUser(id:string) {
    this.crud.deleteData(id, '/users');
    setTimeout(() => {this.crud.getData('codeE', this.crud.codeE, '/users' );}, 200);
  }
}
