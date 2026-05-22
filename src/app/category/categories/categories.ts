import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoriesService} from "../categories-service";
import {Common} from "../../common/common/common";
import {CommonModule} from "@angular/common";
import {ProductService} from "../../products/product-service";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";
import Swal from "sweetalert2";
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, Common,CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
  standalone: true,
})
export class Categories implements OnInit {

  categories: any =[];
  allCategories: any = [];
    private popStateHandler: any;
    cat$!: Observable<any>;

  constructor(private categoryService:CategoriesService,private ps:ProductService,private route:Router, private cd: ChangeDetectorRef,private pd:ProductService) {
  }

  ngOnInit() {

      this.categoryService.getCategoriesProduct().subscribe((res:any)=>{
      if(res.status){
         this.categories = res.categoryProducts;
        this.allCategories = res.categoryProducts;
        this.cd.detectChanges();
       }

    });





  //   search function Implementations

    this.categoryService.currentSearch$.pipe(debounceTime(100)).subscribe((text: string) => {
      const searchText = text?.trim().toLowerCase();
      if (!searchText) {
            this.categories = [...this.allCategories];
            this.cd.detectChanges();
            return;
          }

       this.categories = this.allCategories.filter((item: any) =>
              item.description?.toLowerCase().includes(searchText)
          );

        });



  }

    addTocart(list: any) {

        Swal.fire({
            title: 'Add to Cart?',
            text: 'Do you want to add this item to cart?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {

            if (result.isConfirmed) {
                this.categoryService.fetchAddtoCart(list).subscribe((res: any) => {
                   if(res.status){
                       Swal.fire('Added!', 'Item added to cart successfully.', 'success');
                   }
                });
            }

        });

    }

    buyNow(list:any){

        Swal.fire({
            title: 'Buy Now?',
            text: 'Do you want to Buy this item?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result)=>{
            if (result.isConfirmed) {
                this.pd.sendProductName(list);
                this.route.navigateByUrl('/products/List')
            }
        })



    }





}
