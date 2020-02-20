import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './categoria';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsumorestCategoriaService {

  private categoriasUrl = 'http://localhost:3000/api/categoria';  // URL to web api

  constructor(private http: HttpClient) {
  }
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl)
  }
  getCategoria(id: string): Observable<Categoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }


  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria, httpOptions);
  }

  deleteCategoria(categoria: Categoria | string): Observable<Categoria> {
    const id = typeof categoria === 'string' ? categoria : categoria._id;
    const url = `${this.categoriasUrl}/${id}`;

    return this.http.delete<Categoria>(url, httpOptions);
  }

  updateCategoria(id: string): Observable<Categoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.put<Categoria>(url, httpOptions);
  }
}
