import { Component, OnInit } from '@angular/core';
import { ConsumorestProductoService } from '../service/servicioProducto/consumorest-producto.service';
import { Producto } from '../service/servicioProducto/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  arregloProductos: Producto[];
  producto= new Producto();
  submitted = false;
  message: string;


  constructor(private customerService: ConsumorestProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }


  getProductos() {
    return this.customerService.getProductos().subscribe(productos => {
      console.log(productos);
      this.arregloProductos = productos
    }
    );
  }
  agregarProducto(){
    if (this.producto._id == '') {
      this.submitted = false;
      this.customerService.addProducto(this.producto).subscribe();
      this.arregloProductos.push(this.producto);
      this.producto = new Producto();
    }else{
      this.submitted = true;
      this.customerService.updateProducto(this.producto._id).subscribe();
    }
  }

  editarProducto(productoformulario: Producto) {
    this.producto = productoformulario;
  }



  eliminarDatos(){
    if (confirm('Esta seguro de eliminar?')) {
      this.customerService.deleteProducto(this.producto).subscribe();
      this.arregloProductos.shift();
    }
  }

}
