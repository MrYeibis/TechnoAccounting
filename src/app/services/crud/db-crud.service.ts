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


  constructor(private db: Firestore, private notifications: HotToastService) {
    this.data = []
    this.data$ = new Subject();
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

  getData$(): Observable<any[]>{
    return this.data$.asObservable();
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
