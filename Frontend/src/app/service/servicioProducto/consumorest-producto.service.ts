import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsumorestProductoService {

  private productosUrl = 'http://localhost:3000/api/producto';  // URL to web api

  constructor(private http: HttpClient) {
  }
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl)
  }
  getProducto(id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }


  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto, httpOptions);
  }

  deleteProducto(producto: Producto | string): Observable<Producto> {
    const id = typeof producto === 'string' ? producto : producto._id;
    const url = `${this.productosUrl}/${id}`;

    return this.http.delete<Producto>(url, httpOptions);
  }

  updateProducto(id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.put<Producto>(url, httpOptions);
  }
}
