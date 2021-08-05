import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource:any
  displayedColumns: string[] = ['id', 'name', 'price','action'];
  private configFail: MatSnackBarConfig = {
    
    panelClass: ['style-fail'],
    duration:4000
    
  };

  constructor(private dataService: DataServiceService, private router: Router,public dialog: MatDialog,private snackBar: MatSnackBar) { }

ngOnInit(): void {
    this.getProductsTable();
   
}

getProductsTable(){
    this.dataService.getProducts().subscribe((products)=>{
      
      this.dataSource = new MatTableDataSource(products);
        
      },
      
      error =>{
        
        this.snackBar.open(error.message,'X',this.configFail)
      }
      
    )
}
  
openCreateDialog() {
    
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ProductCreateComponent, dialogConfig);
}

openDeleteDialog(id:number):void{

  const dialogConfig = new MatDialogConfig();

  dialogConfig.data ={id:id}

  this.dialog.open(ProductDeleteComponent, dialogConfig);

}

openUpdateDialog(id:number):void{

  const dialogConfig = new MatDialogConfig();

  dialogConfig.data ={id:id}

  this.dialog.open(ProductUpdateComponent, dialogConfig);

}

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

goProductCreateComponent():void{
    this.router.navigate(['product-create'])
}

goProductUpdateComponent(id:number):void{
    const url =  `product-update/${id}`

    this.router.navigate([url])

}

}
