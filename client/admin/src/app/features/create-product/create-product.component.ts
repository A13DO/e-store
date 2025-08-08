import { ProductsService } from './../../core/services/products.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../../core/interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as CategoriesActions from '../create-product/category store/category.actions';
import { Observable, map, takeUntil } from 'rxjs';
import imageCompression from 'browser-image-compression';
import { Buffer } from 'buffer';
import { BaseComponent } from 'global/base/base.component';

interface formData {
  images: any;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stockQuantity: number;
}
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  base64: any;
  base64Images: any[] = [];
  resultProduct!: formData;
  quantity: number | undefined;
  submitted: boolean = false;
  errorMessage: string | undefined;
  CategoriesObrsv$: Observable<any>;
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  imageUrl: any;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    super();
    this.CategoriesObrsv$ = this.store.pipe(
      select('category')
      // , map(categories => Array.isArray(categories) ? categories : Object.values(categories))
    ); // Directly access the 'category' state
    // this.CategoriesObrsv$ = this.store.pipe(select("categoriesReducer"));
  }
  fileToUpload: any; // Property to store the uploaded file
  title!: string;
  description!: string;
  price!: number;
  category!: string; // Initialize properties for form fields
  discountType!: string;
  arrayOfFiles: File[] = [];
  id!: string;
  currentImage: string = '';
  createMode: boolean = true;
  addCtgMode: boolean = false;
  categories: any = [];
  ngOnInit() {
    // const {id } = this.route.queryParams
    this.productsService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.categories = res.categories;
        this.store.dispatch(
          new CategoriesActions.initializeCategoriesAction(this.categories)
        );
      });
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const { id } = params;
      this.id = id;
    });
    if (this.id) {
      this.createMode = false;
      this.productsService
        .getOneProduct(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resProduct) => {
          this.title = resProduct.title;
          this.description = resProduct.description;
          this.price = resProduct.price;
          this.category = resProduct.category; // Initialize properties for form fields
          this.quantity = resProduct.stockQuantity; // Initialize properties for form fields
          this.base64 = resProduct.images[0]; // Initialize properties for form fields
          console.log(resProduct);
        });
    }
  }
  // can add ngModel only
  onSubmit(form: NgForm): void {
    // form.value.fileToUpload = this.fileToUpload
    console.log(form.controls['title']);

    form.value.images = this.base64Images;
    this.resultProduct = {
      title: form.value.title,
      price: form.value.price,
      description: form.value.description,
      images: form.value.images,
      category: form.value.category,
      rating: 4,
      stockQuantity: form.value.quantity,
    };

    if (this.createMode) {
      this.productsService.createProduct(this.resultProduct);
      // You can add further logic to send the form data to your backend or perform other operations.
    } else {
      this.productsService.updateProduct(this.id, form.value);
    }
    this.submitted = true;
  }
  value1: any = 1500;

  value!: string;
  // handleFileInput(event: any): void {
  //   let files: FileList = event.target.files
  //   this.fileToUpload = files.item(0);
  // }
  handleFileInput(event: any): void {
    this.fileToUpload = event.target.files;
    const remainingSlots = 3 - this.base64Images.length; // 2 1 0
    if (this.fileToUpload.length > remainingSlots) {
      this.errorMessage = `You can only upload ${remainingSlots} more image(s).`;
      remainingSlots === 0
        ? (this.errorMessage = `Your limit is 3 images.`)
        : (this.errorMessage = this.errorMessage);
      return;
    }
    this.errorMessage = ''; // Clear any previous error messages
    for (let file of this.fileToUpload) {
      // handleImageUpload(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (remainingSlots > 0) {
          this.base64Images.push(reader.result);
          console.log(this.base64Images);
        } else {
          console.log('Your limit is 3 images.');
        }
      };
      // const reader = new FileReader();
      // reader.readAsDataURL(file);

      // reader.onload = () => {
      // if (reader.result  && typeof reader.result === 'string') {
      //   if (remainingSlots > 0) {
      //     // Convert the base64 string to a Buffer
      //     const base64String = reader.result.split(',')[1]; // Remove the data URL prefix
      //     const imageBuffer = Buffer.from(base64String, 'base64');

      //     // Now you can push the buffer to your array
      //     this.base64Images.push(imageBuffer);

      //     console.log(this.base64Images); // This will log the buffer array
      //   } else {
      //     console.log("Your limit is 3 images.");
      //   }
      // }
      // };

      // const file = this.fileToUpload[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file)
      // reader.onload = ()=> {
      //   this.base64 = reader.result
      //   console.log(this.base64);
    }
  }
  addUrl(form: NgForm) {
    let value = form.controls['imageUrl'].value;
    console.log(form.controls);

    const remainingSlots = 3 - this.base64Images.length; // 2 1 0
    if (remainingSlots > 0) {
      this.base64Images.push(value);
      console.log(this.base64Images);
      // Mark the file control as valid
      const fileControl = form.controls['file'];
      const urlControl = form.controls['imageUrl'];
      if (fileControl) {
        fileControl.setErrors(null); // This makes the file control valid
        fileControl.markAsTouched(); // Optionally mark it as touched
        console.log(fileControl);
      }
      if (urlControl) {
        urlControl.setErrors(null); // This makes the control valid
        urlControl.markAsTouched(); // Optionally mark it as touched
        console.log(urlControl);
      }
      this.imageUrl = '';
    } else {
      console.log('Your limit is 3 images.');
    }
  }
  switchAddCtgMode() {
    this.addCtgMode = true;
  }
  addNewCategory() {
    // check if already exists
    let input = this.categoryInput.nativeElement.value;

    this.store.dispatch(new CategoriesActions.AddCategoryAction(input));
  }
}
async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // Maximum file size in MB
    maxWidthOrHeight: 1920, // Maximum width or height
    useWebWorker: true, // Use web workers for better performance
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error; // Re-throw the error to handle it outside
  }
}
function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
async function handleImageUpload(file: File) {
  try {
    const compressedFile = await compressImage(file);
    const base64String = await convertToBase64(compressedFile);
    console.log('Compressed and converted image:', base64String);
    // You can now use the base64 string as needed, such as sending it to the backend
  } catch (error) {
    console.error('Error processing image:', error);
  }
}
