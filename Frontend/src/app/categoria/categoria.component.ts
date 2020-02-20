import { Component, OnInit } from '@angular/core';
import { Categoria } from '../service/servicioCategoria/categoria';
import { ConsumorestCategoriaService } from '../service/servicioCategoria/consumorest-categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  arregloCategorias: Categoria[];
  categoria = new Categoria();
  submitted = false;
  message: string;


  constructor(private customerService: ConsumorestCategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }


  getCategorias() {
    return this.customerService.getCategorias().subscribe(categorias => {
      console.log(categorias);
      this.arregloCategorias = categorias
    }
    );
  }
  agregarCategoria(){
    if (this.categoria._id == '') {
      this.submitted = false;
      this.customerService.addCategoria(this.categoria).subscribe();
      this.arregloCategorias.push(this.categoria);
      this.categoria = new Categoria();
    }else{
      this.submitted = true;
      this.customerService.updateCategoria(this.categoria._id).subscribe();
    }
  }

  editarCategoria(categoriaformulario: Categoria) {
    this.categoria = categoriaformulario;
  }



  eliminarDatos(){
    if (confirm('Esta seguro de eliminar?')) {
      this.customerService.deleteCategoria(this.categoria).subscribe();
      this.arregloCategorias.shift();
    }
  }

}
