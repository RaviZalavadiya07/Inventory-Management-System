import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Product from '../../types/product';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,MatFormFieldModule,MatInputModule,MatTableModule,MatButtonModule,MatSortModule,MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'details', 'brandId', 'purchasePrice','salePrice','availableQuntity','action'];

  dataSource!:MatTableDataSource<Product>;
  productService = inject(ProductService);
  products:Product[]=[];

  ngOnInit(): void {
    this.productService.getProduct().subscribe((result)=>{
      this.products = result;
      this.initTable();
    })
  } 
  initTable(){
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
