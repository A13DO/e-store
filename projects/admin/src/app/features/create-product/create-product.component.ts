import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../../core/interfaces/product.model';
import { ActivatedRoute } from '@angular/router';

interface formData {
  image: File | File[] | null,
  title: string,
  description: string,
  price: number,
  category: string,
  rating: number,
}
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
  base64: any;
  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}
  fileToUpload: any; // Property to store the uploaded file
  title!: string;
  description!: string;
  price!: number;
  category!: string; // Initialize properties for form fields
  discountType!: string;
  arrayOfFiles: File[] = [];
  id!: string;
  createMode: boolean = true;
  currentImage: string = "";
  ngOnInit() {
    // const {id } = this.route.queryParams
    this.route.params.subscribe(
      (params) => {
        const {id} = params
        this.id = id
      }
    );
    if(this.id) {
      this.createMode = false;
      this.productsService.getOneProduct(this.id).subscribe(
        resProduct => {
          this.title = resProduct.title
          this.description = resProduct.description
          this.price = resProduct.price
          this.category = resProduct.category // Initialize properties for form fields
          this.base64 = resProduct.images[0] // Initialize properties for form fields
          console.log(resProduct);
        }
      )
    }
  }
  // can add ngModel only
  onSubmit(form: NgForm): void {
    form.value.fileToUpload = this.fileToUpload
    if (this.createMode) {
      this.productsService.createProduct(form.value, this.arrayOfFiles)
      // You can add further logic to send the form data to your backend or perform other operations.
    } else {
      this.productsService.updateProduct(this.id, form.value)
    }
  }
  value1: any = 1500;

value!: string;
// handleFileInput(event: any): void {
//   let files: FileList = event.target.files
//   this.fileToUpload = files.item(0);
// }
handleFileInput(event: any): void {
  this.fileToUpload = event.target.files;
  const file = this.fileToUpload[0];
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = ()=> {
    this.base64 = reader.result
    console.log(this.base64);

  }
}
}
