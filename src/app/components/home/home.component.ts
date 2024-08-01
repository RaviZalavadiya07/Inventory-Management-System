import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BrandService } from '../../services/brand.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
totalOrders! : number;
totalProducts! : number;
totalBrands! : number;

brandService = inject(BrandService);
orderService = inject(OrderService);
productService = inject(ProductService);

ngOnInit(): void {
  this.brandService.getBrand().subscribe((result)=>(this.totalBrands=result.length));  
  this.orderService.getOrder().subscribe((result)=>(this.totalOrders=result.length));  
  this.productService.getProduct().subscribe((result)=>(this.totalProducts=result.length));
}

}
