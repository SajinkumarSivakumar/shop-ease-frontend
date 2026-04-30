import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    const role  = localStorage.getItem('role');

     if(role ==='admin'){
       return true;
     }else {
       Swal.fire({
         icon: 'error',
         title: 'Access Denied',
         text: 'You are not authorized to access this page',
         confirmButtonColor: '#ef4444'
       }).then(() => {
         this.router.navigateByUrl('/category');
       });

       return false;
     }
  }
}