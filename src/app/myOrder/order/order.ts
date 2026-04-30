import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../../products/product-service";
import {Common} from "../../common/common/common";

@Component({
  selector: 'app-order',
  imports: [CommonModule, Common],
  templateUrl: './order.html',
  styleUrl: './order.css',
  standalone: true,
})
export class Order implements OnInit {

  orderList:any;
  constructor(private ps:ProductService,private cd:ChangeDetectorRef) {
  }
  ngOnInit() {
    this.ps.getMyOrder().subscribe((res:any)=>{
      this.orderList = res.order;
      this.cd.detectChanges();
    })
  }
}
