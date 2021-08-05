import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { ProductCreateComponent } from './components/views/product-create/product-create.component';
import { ProductUpdateComponent } from './components/views/product-update/product-update.component';

const routes: Routes = [
  
  {path:'',component:HomeComponent},
  {path:'product-create',component:ProductCreateComponent},
  {path:'product-update/:id',component:ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }