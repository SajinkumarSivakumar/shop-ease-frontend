import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CategoriesService} from "../../category/categories-service";

@Component({
  selector: 'app-common',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './common.html',
  styleUrl: './common.css',
  standalone:true
})
export class Common implements OnInit {

  isSidebarOpen: boolean = false;
  cartLength:any;
  isProfileOpen: boolean = false;
  userEmail: string | null = '';

  constructor(private route: Router,private cs:CategoriesService,private cd:ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    console.log('jj',this.userEmail);
    //   calculate Length Of Cart
    this.cs.getAddToCartList().subscribe((res: any) => {
      if (res.status) {
        this.cartLength = res.categoryProducts.length
        this.cd.detectChanges();

      }

    });
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  onSearch(event: any) {
    const value = event.target.value;
    this.cs.setSearch(value);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToHome(){
    this.route.navigateByUrl('/category');

  }
  navigateToCategories(){
    this.route.navigateByUrl('/products/upload');
  }
  navigateToCart(){
    this.route.navigateByUrl('/cart/List');
  }
  navigateToOrders(){
    this.route.navigateByUrl('/order/List');
  }


  navigateToBuyNow(){
    this.route.navigateByUrl('/products/List');
  }

  logout() {

    localStorage.clear();

    this.route.navigateByUrl('');

  }


}
