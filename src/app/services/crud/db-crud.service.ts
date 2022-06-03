import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where, updateDoc, doc, deleteDoc} from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DbCrudService {

  public data: any = [];
  private data$: Subject<any[]>;

  public dataExcel: any = [];
  private dataExcel$: Subject<any[]>;

  public businessMoney: any = [];
  private businessMoney$: Subject<any[]>;

  public codeE: any = "";

  public id: string = "";
  public name: string = "";
  public surname: string = "";
  public rank: string = "";

  public idUser: string = "";
  public nameUser: string = "";
  public surnameUser: string = "";
  public rankUser: string = "";

  public employee: string = "";
  public productName: string = "";
  public amount: number = 0;
  public unitPrice: number = 0;
  public totalPrice: number = 0;
  public provider: string = "";

  constructor(private db: Firestore, private notifications: HotToastService) {
    this.data = []
    this.data$ = new Subject();

    this.data = []
    this.dataExcel$ = new Subject();

    this.businessMoney = [];
    this.businessMoney$ = new Subject();
  }

  addData(value: any, buscar: string){
    const dbInstance = collection(this.db, buscar);
    addDoc(dbInstance, value).then(() => {
      this.notifications.success('Se Registro Correctamente');
    }).catch((err) => {
      this.notifications.error('Error en el registro');
    });
  }

  getData( what: string, find: string, buscar: string){
    const q = query(collection(this.db, buscar), where(what, '==', find))
    getDocs(q).then((response) => {
      this.data = [...response.docs.map((item) => {
        return {...item.data(), id:item}
      })]
      this.data$.next(this.data);
    })
  }

  

  getBusinessMoney(where: string){
    const dbInstance = collection(this.db, where);
    getDocs(dbInstance)
    .then((response) => {
      this.businessMoney = [...response.docs.map((item) => {
        return { ...item.data(), id: item}
      })]
      this.businessMoney$.next(this.businessMoney);
    })
  }

  getAllData(where: string) {
    const dbInstance = collection(this.db, where);
    getDocs(dbInstance)
    .then((response) => {
      this.data = [...response.docs.map((item) => {
        return { ...item.data(), id: item}
      })]
      this.data$.next(this.data);
    })
  }

  getExcelData(where: string) {
    const dbInstance = collection(this.db, where);
    getDocs(dbInstance)
    .then((response) => {
      this.dataExcel = [...response.docs.map((item) => {
        return { ...item.data(), id: item}
      })]
      this.dataExcel$.next(this.dataExcel);
    })
  }

  getData$(): Observable<any[]>{
    return this.data$.asObservable();
  }

  getExcelData$(): Observable<any[]>{
    return this.dataExcel$.asObservable();
  }

  getBusinessMoney$(): Observable<any[]>{
    return this.businessMoney$.asObservable();
  }

  updateData(id: string, changedata: any, buscar: string){
    const dataToUpdate = doc(this.db, buscar, id);
    updateDoc(dataToUpdate,changedata).then(() => {
      this.notifications.success('Se Actualizo Correctamente');
    }).catch((err) => {
      this.notifications.error('Error en la actualización');
    });
  }

  deleteData(id: string, buscar: string){
    const dataToDelete = doc(this.db, buscar, id);
    deleteDoc(dataToDelete).then(() => {
      this.notifications.success('Se Elimino Correctamente');
    }).catch((err) => {
      this.notifications.error('Error en el proceso');
    });
  }

}
