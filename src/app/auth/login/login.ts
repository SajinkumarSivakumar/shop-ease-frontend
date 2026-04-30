import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Auth} from "../auth";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {

  showPassword: boolean = false;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb:FormBuilder,private route:Router,private authService:Auth) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next:(res: any)=>{

        localStorage.setItem('token', res.result.access_token);
        localStorage.setItem('role', res.result.user.role);
        localStorage.setItem('email', res.result.user.email);
        Swal.fire({
          title: 'Login Successful',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'small-swal'
          }
        }).then((result)=>{
          if(result.isConfirmed){
            this.route.navigateByUrl('category');
          }
        });

        this.isLoading = false;

      },
      error: () => {
        alert('Invalid Email or Password ');
        this.isLoading = false;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
