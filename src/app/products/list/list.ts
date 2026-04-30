import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product-service";
import {Common} from "../../common/common/common";
import Swal from "sweetalert2";


@Component({
  selector: 'app-list',
  imports: [
    Common,
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: true,
})
export class List implements OnInit {
  product: any;
  constructor(private ps:ProductService) {
  }

  ngOnInit() {
    this.ps.itemName.subscribe((res:any)=>{
      console.log('jjj',res)
      this.product = res;
    })
  }

  yourOrder(product: any) {

    Swal.fire({
      title: 'Confirm Order?',
      text: 'Do you want to place this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Order Now!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.ps.saveYourOrder(product).subscribe((res: any) => {

          console.log(res);

          if (res.status) {
            Swal.fire(
                'Success!',
                'Your order has been placed 🎉',
                'success'
            );
          }

        });

      }

    });

  }
}
