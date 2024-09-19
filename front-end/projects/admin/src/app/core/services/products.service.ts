import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product.model';
interface formData {
  image: File | File[] | null,
  title: string,
  description: string,
  price: number,
  category: string,
  rating: number,
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(category?: string, sortOption?: string, numericFilter?: string) {
    let apiUrl :string =  `https://e-commerce-api-wvh5.onrender.com/api/v1/products`;
    // ?numericFilter=150,670
    let sign = "?"
    if (category) {
      apiUrl = apiUrl + `${sign}category=${category}`
      sign = "&"
      console.log(apiUrl);
    }
    if (sortOption) {
      apiUrl = apiUrl + `${sign}sort=${sortOption}`
      sign = "&"
      console.log(apiUrl);
    }
    if (numericFilter) {
      apiUrl = apiUrl + `${sign}numericFilter=${numericFilter}`
      console.log(apiUrl);
    }
    return this.http.get<{ success: boolean, data: Product[] }>(apiUrl)
    .pipe(map((res)=> {
      const products: Product[] = res.data.map(product => {
        const absoluteImages = product.images.map(image => {
          if (image.startsWith("uploads")) {
            return `https://e-commerce-api-wvh5.onrender.com/${image}`;
          }
          return image
        });
        return { ...product, images: absoluteImages,  unit: 1 }
      })
      return products
    }))
  }
  getOneProduct(id: string) {
    return this.http.get<any>(`https://e-commerce-api-wvh5.onrender.com/api/v1/products/${id}`)
    .pipe(map((res)=> {
      const product: Product = res.data
      const absoluteImages = product.images.map(image => {
        if (image.startsWith("uploads")) {
          return `https://e-commerce-api-wvh5.onrender.com/${image}`;
        }
        return image
      })
      return {...product, images: absoluteImages}
    })
  )}
  // createProduct(body: any, arrayOfFiles: File[]) {
  createProduct(body: any) {
    console.log(body);

    // const fd = new FormData();
    // for (let i = 0; i < body.fileToUpload.length; i++) {
    //   console.log(body.fileToUpload[i].name);
    //   fd.append('uploads', body.fileToUpload[i], body.fileToUpload[i].name);
    // }

    // fd.append('title', body.title);
    // fd.append('description', body.description);
    // fd.append('price', body.price);
    // fd.append('rating', '3');
    // fd.append('images', body.fileToUpload);
    // fd.append('category', body.category);
    // fd.append('stockQuantity', '12');


    this.http.post<any>(`https://e-commerce-api-wvh5.onrender.com/api/v1/products`, body).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
  updateProduct(id: string, body: any) {
    console.log(body);

    // const fd = new FormData();
    // for (let i = 0; i < body.fileToUpload.length; i++) {
    //   console.log(body.fileToUpload[i].name);
    //   fd.append('uploads', body.fileToUpload[i], body.fileToUpload[i].name);
    // }
    // fd.append('title', body.title);
    // fd.append('description', body.description);
    // fd.append('price', body.price);
    // fd.append('rating', '3');
    // fd.append('category', body.category);
    // fd.append('stockQuantity', '12');

    this.http.patch(`https://e-commerce-api-wvh5.onrender.com/api/v1/products/${id}`, body).subscribe(
      res => {
        console.log(res);
      }
    )
  }
  deleteProduct(id: string) {
    this.http.delete(`https://e-commerce-api-wvh5.onrender.com/api/v1/products/${id}`).subscribe(
      res => {
        console.log(res);
      }
    )
  }
  getOrders() {
    return this.http.get<any>(`https://e-commerce-api-wvh5.onrender.com/api/v1/orders`)
    .pipe(map((res)=> {
      const orders: any = res.orders
      return orders
    }
  ))
  }
  deleteOrder(id: string) {
    this.http.delete(`https://e-commerce-api-wvh5.onrender.com/api/v1/orders/${id}`).subscribe(
      res => {
        console.log(res);
      }
    )
  }
  getAllCategories() {
    return this.http.get(`https://e-commerce-api-wvh5.onrender.com/api/v1/categories`)
  }
}

// Edit Product Method
// images uploads Errors
