import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DbCrudService } from 'src/app/services/crud/db-crud.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  public data: any = [];
  public dataExcel: any = [];
  public amount: number = 1;
  public unitPrice: number = 1;
  public employee: string = "";
  public event:any = "";
  public dataHere: boolean = false;

  file:any = []

  new = new FormGroup({
    accountant: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    uploadedDate: new FormControl(''),
    urlFile: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  })


  constructor(private storageService: StorageService, public crud: DbCrudService, private notifications: HotToastService) { }

  ngOnInit(): void {
    this.crud.getData$().subscribe( serviceData => {
      this.data = serviceData;
      this.dataHere = true;
    })

    this.crud.getExcelData$().subscribe( serviceData => {
      this.dataExcel = serviceData;
    })

    this.getData();
    this.employee = this.crud.employee;
  }

  getData(){
    if(this.crud.rank == "Administrador"){
      this.crud.getAllData('/business/' + this.crud.codeE + '/reports');
    } else {
      this.crud.getData('buyer', this.crud.employee, '/business/' + this.crud.codeE + '/reports');
    }
  }

  getEvent(event: any){
    this.event = event;
    this.new.controls['urlFile'].setValue('.')
  }

  uploadFile(event: any) {
    let type = '';
    let file = event.target.files
    let reader = new FileReader();
    for(let item of file){
       type = item.name.split('.')[1];
    }
    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      setTimeout(()=>{this.notifications.info('Subiendo el informe, espere un momento')}, 300) 
      this.file.push(reader.result);
      this.storageService.uploadFile('Reporte ' + Date() + '.' + type, reader.result).then(urlFile => {
        const date = new Date();
        this.new.controls['urlFile'].setValue(urlFile);
        this.new.controls['uploadedDate'].setValue(date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear());
        this.crud.addData(this.new.value, '/business/' + this.crud.codeE + '/reports');
        setTimeout(() => {this.getData();}, 200);
      }).catch((err) => {
        this.notifications.error('Error en el registro');
      });
    }
  }

  exportToExcel(json:any[], excelFileName: string):void{
    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { 
      Sheets : { 'data' : worksheet },
      SheetNames : ['data'] 
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // call method buffer and fileName
    this.saveAsExcel(excelBuffer, excelFileName)
  }


  saveAsExcel(buffer:any, fileName:string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + EXCEL_EXT);
  }

  exportAsExcelBuys(){
    this.notifications.info('Exportando consulta, espere un momento')
    this.crud.getExcelData('/business/' + this.crud.codeE + '/buys');
    setTimeout(()=>{const finalData = [];
      for(let item of this.dataExcel){
        finalData.push({
          NºFactura: item.billNumber,
          Comprador: item.buyer,
          Proveedor: item.provider,
          Producto: item.productName,
          Cantidad: item.amount,
          ValorUnitario: item.unitPrice,
          ValorTotal: item.totalPrice
        })
      }
      this.dataExcel = finalData;},1500)
    setTimeout(()=>{
      this.exportToExcel(this.dataExcel, 'Reporte de Compras Generado En La Fecha ' + Date());
    },2000);
  }

  exportAsExcelSells(){
    this.notifications.info('Exportando consulta, espere un momento')
    this.crud.getExcelData('/business/' + this.crud.codeE + '/sells');
    setTimeout(()=>{const finalData = [];
      for(let item of this.dataExcel){
        finalData.push({
          NºFactura: item.billNumber,
          Vendedor: item.seller,
          Producto: item.productName,
          Cantidad: item.amount,
          ValorUnitario: item.unitPrice,
          ValorTotal: item.totalPrice
        })
      }
      this.dataExcel = finalData;},1500)
    setTimeout(()=>{
      const date = new Date();
      this.exportToExcel(this.dataExcel, 'Reporte de Ventas Generado En La Fecha ' + Date());
    },2000);
  }

}
