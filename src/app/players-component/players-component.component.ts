import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { DetailComponent } from '../detail-component/detail-component.component';
import { BusquedaPipe } from '../pipes/busqueda.pipe'; // Importa el Pipe de búsqueda

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailComponent, BusquedaPipe], // Añade el Pipe aquí
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})
export class PlayersComponent implements OnInit {
  posicionSeleccionada: string = '';
  searchText: string = '';
  datos: any[] = []; // Aquí almacenaremos los jugadores del JSON
  jugadorEncontrado: any = null;
  jugadorNoEncontrado: boolean = false;
  equipoSeleccionado: string = '';


  ngOnInit(): void {
    // Cargar los datos usando fetch
    fetch('data/datos-equipos.json')
      .then((response) => response.json())
      .then((data) => {
        this.datos = data; // Asigna los datos del archivo JSON a la variable 'datos'
      })
      .catch((error) =>
        console.error('Error al cargar los datos del JSON:', error)
      );
  }

  // Método para realizar la búsqueda
 /* realizarBusqueda() {
    const resultado = this.datos.filter(
      (jugador) =>
        jugador.nombre.toLowerCase().includes(this.searchText.toLowerCase()) &&
        jugador.posicion.toLowerCase() ===
          this.posicionSeleccionada.toLowerCase()
    );

    if (resultado.length > 0) {
      this.jugadorEncontrado = resultado[0]; // Si se encuentra, mostramos el primer jugador
      this.jugadorNoEncontrado = false;
    } else {
      this.jugadorEncontrado = null;
      this.jugadorNoEncontrado = true;
    }
  } */

    realizarBusqueda() {
      const resultado = this.datos.filter((jugador) => {
        const nombreCoincide = jugador.nombre.toLowerCase().includes(this.searchText.toLowerCase());
        const posicionCoincide = this.posicionSeleccionada ? 
                                 jugador.posicion.toLowerCase() === this.posicionSeleccionada.toLowerCase() : 
                                 true;  // Si no hay posición seleccionada, siempre será true
    
        return nombreCoincide && posicionCoincide;
      });
    
      if (resultado.length > 0) {
        this.jugadorEncontrado = resultado[0];  // Si se encuentra, mostramos el primer jugador
        this.jugadorNoEncontrado = false;
      } else {
        this.jugadorEncontrado = null;
        this.jugadorNoEncontrado = true;
      }
    }
    
    seleccionarEquipo(equipo: string) {
    this.equipoSeleccionado = equipo; // Aquí pasamos el equipo seleccionado
    this.resetJugadorSeleccionado(); // Resetea el jugador seleccionado al cambiar de equipo
  }

  // Método para resetear la búsqueda
  resetBusqueda() {
    this.searchText = '';
    this.posicionSeleccionada = '';
    this.jugadorEncontrado = null;
    this.jugadorNoEncontrado = false;
  }

  // Método para resetear el jugador seleccionado
  resetJugadorSeleccionado() {
    this.jugadorEncontrado = null;
  }
}
