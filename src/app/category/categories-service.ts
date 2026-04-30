import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {environment as env} from'../../../enviroment/enviromental'



@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  private searchText = new BehaviorSubject<string>('');
  currentSearch$ = this.searchText.asObservable();

  constructor(private http:HttpClient) {
  }

  setSearch(text: string) {
    this.searchText.next(text || '');
  }

  getCategoriesProduct(): Observable<any> {
    return this.http.get(env.apiUrl + 'master/getCategoriesProduct');
  }

  fetchAddtoCart(data:any){
    return this.http.post(env.apiUrl +'master/fetchAddtoCart', data)
  }

  getAddToCartList(): Observable<any> {
    return this.http.get(env.apiUrl + 'master/getAddToCartList');
  }

  removeCartProduct(id: any) {
    return this.http.delete(env.apiUrl + 'master/removeCartProduct', {
      body: { id: id }
    });
  }

}
