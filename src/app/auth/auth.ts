import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import {environment as env} from'../../../enviroment/enviromental'


@Injectable({
  providedIn: 'root',
})
export class Auth {



  constructor(private http:HttpClient) {
  }

  login(data: any){
    return this.http.post(env.apiUrl + 'auth/login', data);
  }

  createUserRegister(data: any): Observable<any> {
    return this.http.post(env.apiUrl + 'auth/register', data);
  }

}
