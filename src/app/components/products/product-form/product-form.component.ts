import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrandService } from '../../../services/brand.service';
import Brand from '../../../types/brands';
import { ProductService } from '../../../services/product.service';
import Product from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  builder = inject(FormBuilder);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands : Brand[]=[];
  router = inject(Router);
  route = inject(ActivatedRoute);
  product!:Product;


  productForm : FormGroup = this.builder.group({
    name :['',[Validators.required]],
    details : [''],
    brandId : ['',[Validators.required]],
    purchasePrice : ['',[Validators.required]],
    salePrice: ['',[Validators.required]],
    availableQuntity:['',[Validators.required]]
  })

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.brandService.getBrand().subscribe((result)=>(this.brands=result));
    if (id) {
      this.productService.getProducts(id).subscribe((result)=>{
        this.product = result;
        this.productForm.patchValue(this.product);
      })      
    }
  }
  addProduct(){
    if(this.productForm.invalid){
      alert("Please provide all the detalis ");
      return;
    }
    let product:Product = this.productForm.value;
    this.productService.addProduct(product).subscribe((result)=>{
      alert("Your product is added successfully");
      this.router.navigateByUrl('/product');
    })
  };
  updateProduct(){
    if(this.productForm.invalid){
      alert("Please provide all the detalis ");
      return;
    }
    let product:Product = this.productForm.value;
    this.productService.updateProduct(this.product.id!,product).subscribe((result)=>{
      alert("Your product is updated successfully");
      this.router.navigateByUrl('/product');
    })
  }
}
