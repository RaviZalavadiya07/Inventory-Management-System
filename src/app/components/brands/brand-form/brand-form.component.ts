import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Brand from '../../../types/brands';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [MatInputModule,FormsModule,RouterLink,MatFormFieldModule,MatSelectModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent {
 name! : string;

 brandService = inject(BrandService);

 router = inject(Router);
 route = inject(ActivatedRoute);

 brand!:Brand;

 ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  if (id){
    this.brandService.getBrands(id).subscribe((result)=>{
      this.brand=result;
      this.name=result.name;
    })
  }
 }


 addBrand(){
  if (! this.name) {
    alert("Please enter the Brand Name");
  }

  let brand : Brand = {
    name:this.name
  };
  this.brandService.addBrand(brand).subscribe((result)=>{
    alert("Brand added Successfully");
    this.router.navigateByUrl("/brands");
  });
 }

 updateBrand(){
  if (! this.name) {
    alert("Please enter the Brand Name");
  }

  let brand : Brand = {
    id :this.brand.id,
    name:this.name
  };
  this.brandService.updateBrand(brand).subscribe((result)=>{
    alert("Brand updated Successfully");
    this.router.navigateByUrl("/brands");
  });
 }
}
