import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Categories} from "../../category/categories/categories";
import {CategoriesService} from "../../category/categories-service";
import {Common} from "../../common/common/common";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart-list',
  imports: [CommonModule, Common],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
  standalone:true
})
export class CartList implements OnInit {

  cartList: any[] = [];
  totalAmount: number = 0;
  private popStateHandler: any;


  constructor(private cs:CategoriesService,private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    history.pushState({ page: 1 }, '', location.href);
    this.popStateHandler = (event: any) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to go back?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          window.removeEventListener('popstate', this.popStateHandler);
          history.back();
        } else {
          history.pushState({ page: 1 }, '', location.href);
        }

      });

    };

    window.addEventListener('popstate', this.popStateHandler);


    this.apiCallFunc();
  }


  apiCallFunc(){
    this.cs.getAddToCartList().subscribe((res: any) => {

      if (res.status) {
        this.cartList = res.categoryProducts.map((item: any) => ({
          ...item,
          finalRate: Number(item.finalRate),
          rate: Number(item.rate)
        }));

      }
      this.calculateTotal();
      this.cd.detectChanges();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartList.reduce((sum: any, item: { finalRate: any; }) => {
      return sum + item.finalRate;
    }, 0);
  }

  removeItem(item: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.cs.removeCartProduct(item.id).subscribe((res: any) => {

          if (res.status) {
            Swal.fire(
                'Deleted!',
                'Item removed successfully',
                'success'
            );

            this.apiCallFunc();
          }

        });

      }

    });
  }
}
