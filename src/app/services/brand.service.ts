import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Brand from '../types/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }
  http = inject(HttpClient);

  getBrand(){
   return this.http.get<Brand[]>("http://localhost:3000/brands")
  }
  addBrand(brand:Brand){
   return this.http.post<Brand>("http://localhost:3000/brands",brand);
  }
  getBrands(brandId:string){
    return this.http.get<Brand>("http://localhost:3000/brands/"+brandId);
   }
   updateBrand(brand:Brand){
    return this.http.put<Brand>("http://localhost:3000/brands/"+brand.id,brand);
   }

}
