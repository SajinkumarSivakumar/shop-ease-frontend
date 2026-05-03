import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../product-service";
import Swal from "sweetalert2";
import {Common} from "../../common/common/common";
import {FormsModule} from "@angular/forms";
import {OnDestroy} from "@angular/core";

@Component({
  selector: 'app-products-upload',
  imports: [CommonModule, Common,FormsModule],
  templateUrl: './products-upload.html',
  styleUrl: './products-upload.css',
  standalone:true
})
export class ProductsUpload implements OnInit {

  selectedFile: File | null = null;
  inputValue: string = '';
  rate:string ='';
  discount:string ='';
  finalRate:string ='';


  constructor(private productService:ProductService) {
  }
  ngOnInit() {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
   event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  removeFile() {
    this.selectedFile = null;
  }

  calculateFinalRate(){
    const rate = Number(this.rate);
    const discount = Number(this.discount);

    if (!rate || !discount) {
      this.finalRate = '';
      return;
    }

    const final = rate - (rate * discount / 100);
    this.finalRate = final.toFixed(2);
  }

  uploadFile() {
    if (!this.selectedFile) {return;}
    const formData = new FormData();
    formData.append('fileUpload', this.selectedFile);
    formData.append('text', this.inputValue);
    formData.append('rate', this.rate);
    formData.append('discount', this.discount);
    formData.append('finalRate', this.finalRate);



    this.productService.uploadProducts(formData).subscribe((res:any)=>{
      if(res.status){
        Swal.fire({
          title:'success',
          text: res.msg,
          icon: 'success',
        });
        this.selectedFile = null;
        this.inputValue = '';
        this.rate = '';
        this.discount = '';
        this.finalRate = '';
      }else {
        Swal.fire({
          title:'error',
          text: 'Something Error, Please try Some Times',
          icon: 'error',
        });
      }
    })
  }

}
