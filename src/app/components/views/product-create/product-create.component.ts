import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DataServiceService } from 'src/app/services/data-service.service';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  myForm:any;

  constructor(private fb: FormBuilder, private dataService: DataServiceService, private router: Router,private snackBar: MatSnackBar) { }

  private configSuccess: MatSnackBarConfig = {
    
    panelClass: ['style-success'],
    duration:1500
    
  };
  

  private configFail: MatSnackBarConfig = {
    
    panelClass: ['style-fail'],
    duration:1500
    
  };

ngOnInit(): void {
    this.myForm = this.fb.group({
      name:[null,[Validators.minLength(4),Validators.required]],
      price:[null,[Validators.minLength(2),Validators.pattern("^[0-9.]*$"),Validators.required]]
    });    

}

createProduct(product:Product):void{

      this.dataService.createProduct(product).subscribe(()=>{
      
      this.reloadComponent()
      
      this.snackBar.open('Saved Product!','X',this.configSuccess)
    
      },
      error =>{
        this.snackBar.open(error.message,'X',this.configFail)
      })
}

reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
}

get price() {
    return this.myForm.get('price');
} 

}
