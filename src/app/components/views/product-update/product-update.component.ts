import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private dataService: DataServiceService, private fb:FormBuilder, private snackBar: MatSnackBar, private route:ActivatedRoute, private router: Router) { }

  myForm:any;
  product!: Product;
 
ngOnInit(): void {
    this.createForm();
    this.loadDataForm();
  }

loadDataForm():void{

  const id = this.route.snapshot.paramMap.get('id')
  this.dataService.getProductById(String(id)).subscribe(product=>{
      this.product = product
      this.myForm.patchValue(product) 
  }) 
}

createForm():void{
  this.myForm = this.fb.group({
    name:[null,[Validators.minLength(4),Validators.required]],
    price:[null,[Validators.minLength(2),Validators.pattern("^[0-9.]*$"),Validators.required]]
  });
}

get price() {
  return this.myForm.get('price');
} 

cancel():void{
  this.router.navigate([''])

}

update(product:Product):void{
  
  this.product.name = product.name;
  this.product.price = product.price;
  this.dataService.updateProduct(this.product).subscribe(() => {
  this.router.navigate([''])
  this.snackBar.open('Updated Product!','X',{
      duration:1000
    })
  })
}

}