import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import Order from '../../types/order';
import { OrderService } from '../../services/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product.service';
import Product from '../../types/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatFormFieldModule,MatInputModule,MatTableModule,MatSortModule,MatPaginatorModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [ 
    'orderNo',
    'productId',
    'quantity',
    'salePrice',
    'discount',
    'totalAmount',
    'action1',
  ];

  dataSource!:MatTableDataSource<Order>;
  orderService = inject(OrderService);
  productService = inject(ProductService);
  orders:Order[]=[];
  products:Product[]=[];
  
  ngOnInit(): void {
    this.productService.getProduct().subscribe((result)=>(this.products = result));
    this.orderService.getOrder().subscribe((result)=>{
      this.orders = result;
      this.initTable();
    });
  }
  initTable(){
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getProductName(id:string){
    return this.products.find(x=>x.id == id)?.name;
  }
  cancelOrder(order:Order){
    this.orderService.deleteOrder(order.id!).subscribe(()=>{
      alert("Order cancelled");
      this.productService.getProducts(order.productId).subscribe((product)=>{
        product.availableQuntity = +product.availableQuntity + +order.quantity!;
        this.productService.updateProduct(product.id!,product).subscribe();
      });
      this.orders = this.orders.filter((x)=>x.id != order.id);  
      this.dataSource.data = this.orders; 
    });
  }
}
