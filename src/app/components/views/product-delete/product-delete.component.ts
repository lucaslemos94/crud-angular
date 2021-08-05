import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private dataService: DataServiceService,@Inject(MAT_DIALOG_DATA) public data: {id: number},private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {}

  deleteProductById():void{
    this.dataService.deleteProductById(this.data.id).subscribe(()=>{
      this.reloadComponent()
      this.snackBar.open('Delete Sucess!','X',{duration:2000});
    }) 

  }

  reloadComponent() {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}