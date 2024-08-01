import { Component, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Order from '../../../types/order';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import Product from '../../../types/product';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,MatButtonModule,RouterLink,FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  orderService = inject(OrderService);
  productService = inject(ProductService);
  router = inject(Router);
  order!:Order;

  formbuilder = inject(FormBuilder)
  orderForm = this.formbuilder.group<Order>({
    orderNo:'',
    productId:'',
    quantity:null,
    salePrice:null,
    discount:null,
    totalAmount:null
  }
  );

  products : Product[]=[];
  route = inject(ActivatedRoute);
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.orderService.getOrders(id).subscribe((result)=>{
        this.order = result;
        this.orderForm.patchValue(this.order);
        this.productService.getProduct().subscribe(result=>{
          this.products=result;
          this.selectedProduct=this.products.find((x)=>x.id == this.order.productId);
          this.orderForm.controls.productId.disable();
        });
      });      
    }else{
      this.productService.getProduct().subscribe(result=>{
        this.products=result;
        this.selectedProduct=this.products.find((x)=>x.id == this.order.productId);
      });
    }
    this.orderForm.controls.orderNo.addValidators(Validators.required);
    this.orderForm.controls.productId.addValidators(Validators.required);
    this.orderForm.controls.quantity.addValidators(Validators.required);
    this.productService.getProduct().subscribe(result=>this.products=result)
    this.updateTotalAmount();
  }

  addOrder(){
    if (this.orderForm.invalid) {
      alert("Please provide all detalis");
    }
    let formValue = this.orderForm.getRawValue() as Order;
    if (formValue.quantity!>this.selectedProduct?.availableQuntity!) {
      alert("You have only " +this.selectedProduct?.availableQuntity!+ " quantity");
      return;
    }
    this.orderService.addOrder(formValue).subscribe(()=>{
      this.selectedProduct!.availableQuntity -= formValue.quantity!;
      this.productService.updateProduct(this.selectedProduct!.id!,this.selectedProduct!).subscribe();
      alert("Your Order added successfully");
      this.router.navigateByUrl('/orders');
    }) 
  }

  updateOrder(){
    if (this.orderForm.invalid) {
      alert("Please provide all detalis");
    }
    let formValue = this.orderForm.getRawValue() as Order;
    if (formValue.quantity!>this.selectedProduct?.availableQuntity!+this.order.quantity!) {
      alert("You have only " +this.selectedProduct?.availableQuntity!+ " quantity");
      return;
    }
    this.orderService.updateOrder(this.order.id!,formValue).subscribe(()=>{
      this.selectedProduct!.availableQuntity -= (formValue.quantity! = this.order.quantity!);
      this.productService.updateProduct(this.selectedProduct!.id!,this.selectedProduct!).subscribe();
      alert("Your Order updated successfully");
      this.router.navigateByUrl('/orders');
    }) 
  }

  updateTotalAmount(){
      this.orderForm.valueChanges.subscribe(()=>{
        this.orderForm.controls.totalAmount.disable({emitEvent:false});
        if(this.orderForm.getRawValue().productId && this.orderForm.value.quantity){
          let total = this.selectedProduct?.salePrice! * this.orderForm.value.quantity - (this.orderForm.value.discount || 0);
          this.orderForm.controls.totalAmount.setValue(total,{emitEvent:false})
        }
        this.orderForm.controls.totalAmount.disable({emitEvent:false});
      });
  }


  selectedProduct?:Product;
  productSelected(productId:string){
    this.selectedProduct=this.products.find((x)=>x.id == productId);
    this.orderForm.controls.salePrice.enable();
    this.orderForm.controls.salePrice.setValue(this.selectedProduct?.salePrice!);
    this.orderForm.controls.salePrice.disable(); 
  }
}
