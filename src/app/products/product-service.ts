import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {environment as env} from'../../../enviroment/enviromental'

@Injectable({
  providedIn: 'root',
})
export class ProductService {


  private name = new BehaviorSubject<string>('');
   itemName = this.name.asObservable();

  constructor(private http:HttpClient) {
  }


  sendProductName(name:any){
    this.name.next(name);
  }

  uploadProducts(data: any): Observable<any> {
    return this.http.post(env.apiUrl + 'master/fileUpload', data);
  }

  saveYourOrder(data:any):Observable<any>{
    return this.http.post(env.apiUrl + 'master/saveYourOrder', data);
  }

  getMyOrder() {
    return this.http.get(env.apiUrl + 'master/getMyOrder');
  }


}
