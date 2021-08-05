import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  apiUrl="http://localhost:3001/products"
  obj:Product | undefined

  constructor(private HttpClient: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.HttpClient.get<Product[]>(this.apiUrl)
  }

  getProductById(id:string): Observable<Product>{
    const url = `${this.apiUrl}/${id}`
    return this.HttpClient.get<Product>(url)

  }

  createProduct(product: Product): Observable<Product>{
    return this.HttpClient.post<Product>(this.apiUrl,product)
  }

  deleteProductById(id:number): Observable<Product>{
    return this.HttpClient.delete<Product>(this.apiUrl +'/'+ id)

  }

  updateProduct(product: Product):Observable<Product>{
    const url = `${this.apiUrl}/${product.id}`
    return this.HttpClient.put<Product>(url,product)

  }
 
  saveObj(obj:any){
    this.obj = obj

  }

  retrieveObj():any{
    return this.obj
  }

}
