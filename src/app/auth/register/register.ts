import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Auth} from "../auth";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register implements OnInit {

  registerForm: any;
  showPassword: boolean =false;
  showConfirmPassword: boolean =false;

  constructor(private authService:Auth,private fb:FormBuilder,private router:Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      email:['', Validators.required],
      password:['',Validators.required],
      confirmPassword:['', Validators.required],
      //role:['', Validators.required]

    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    this.authService.createUserRegister(formValue).subscribe((res: any) => {

      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.msg,
          confirmButtonColor: '#ff4d7e'
        }).then(() => {
          this.router.navigateByUrl('');
        });
      }

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
