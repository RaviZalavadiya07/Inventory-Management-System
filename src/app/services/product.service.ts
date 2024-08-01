import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  http = inject(HttpClient);
  getProduct(){
   return this.http.get<Product[]>("http://localhost:3000/products")
  }
  addProduct(product:Product){
    return this.http.post<Product>("http://localhost:3000/products",product);
  }
  getProducts(id:string){
    return this.http.get<Product>("http://localhost:3000/products/" + id);
  }
  updateProduct(id:string,product:Product){
    return this.http.put<Product>("http://localhost:3000/products/" + id,product);
  }
  
}
