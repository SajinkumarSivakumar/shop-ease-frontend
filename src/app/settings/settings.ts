import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Auth} from "../auth/auth";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {debounceTime, of, switchMap} from "rxjs";
import {MatSelectSearchComponent} from "ngx-mat-select-search";

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSelectSearchComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  standalone:true
})
export class Settings implements OnInit {
  users: any =[];
  allusers: any = [];
  settings:any;
  constructor(private ms:Auth,private fb:FormBuilder) {
  }

  ngOnInit() {

    this.settings = this.fb.group({
      email:[''],
      role:[''],
      emailCtrl:['']
    })



    this.ms.getUsersdetails().subscribe((res:any)=>{
      if(res.status){
        this.users = res.users;
        this.allusers = res.users;
      }
    });

   this.settings.get('emailCtrl').valueChanges.pipe(debounceTime(100),switchMap((key:string)=>{
     if(!key){
       return of(this.allusers)
     }

     const filter = this.allusers.filter((list: { email: string; })=>
     list.email?.toLowerCase().includes(key.toLowerCase())
     );
     return of(filter)
   })).subscribe((res:any)=>{
     this.users = res
   })

  }
  saveSettings() {

    const formValue = this.settings.getRawValue()

    delete formValue.emailCtrl
    this.ms.saveUserRole(formValue).subscribe((res:any)=>{

   })
  }
}
