import { Component, OnInit } from '@angular/core';
import listadoNombreEquipo from '../../data/datos-equipos.json';
import { CommonModule } from '@angular/common';

//import { ServicioCliente } from '../servicio-cliente/servicio-cliente.component';



@Component({
  selector: 'app-lista-equipos',
  standalone: true,
  templateUrl: './lista-equipos.component.html',
  styleUrl: './lista-equipos.component.css',
  imports: [
    CommonModule,
    // otros módulos que necesites
  ]
})
export class ListaEquiposComponent implements OnInit {
  
   datos:any[]=listadoNombreEquipo;
    

    ngOnInit() {
        
     // console.log(this.datos);
    }

}


 
 