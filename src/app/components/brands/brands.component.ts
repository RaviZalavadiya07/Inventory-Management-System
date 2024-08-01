import { Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import Brand from '../../types/brands';
import { BrandService } from '../../services/brand.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,RouterLink,MatButtonModule,MatPaginatorModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name','action'];

  dataSource!: MatTableDataSource<Brand>;

  brandService = inject(BrandService);
  ngOnInit(): void {
    this.brandService.getBrand().subscribe(result=>{
      this.initTable(result)
    })
  }
  initTable(data:Brand[]){
    this.dataSource = new MatTableDataSource(data);
   this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
