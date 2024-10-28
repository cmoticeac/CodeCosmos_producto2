import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() equipoSeleccionado: string = ''; // Recibe el equipo seleccionado
  jugadores: any[] = []; // Se cargará desde el JSON
  jugadoresFiltrados: any[] = []; // Almacena los jugadores filtrados según el equipo
  jugadorSeleccionado: any = null; // Jugador seleccionado

  ngOnInit(): void {
    // Cargar los datos desde el archivo equipo-datos.json
    fetch('data/datos-equipos.json')
      .then((response) => response.json())
      .then((data) => {
        this.jugadores = data; // Asigna los datos del JSON a la variable 'jugadores'
        this.filtrarJugadores(); // Filtrar jugadores por equipo
      })
      .catch((error) =>
        console.error('Error al cargar los datos del JSON:', error)
      );
  }

  ngOnChanges(): void {
    // Filtrar jugadores cuando cambia el equipo seleccionado
    this.filtrarJugadores();
    // Resetear el jugador seleccionado cuando cambia el equipo
    this.jugadorSeleccionado = null;
  }

  // Función para filtrar los jugadores según el equipo seleccionado
  filtrarJugadores() {
    if (this.equipoSeleccionado) {
      this.jugadoresFiltrados = this.jugadores.filter(
        (jugador) => jugador.equipo === this.equipoSeleccionado
      );
    } else {
      this.jugadoresFiltrados = [];
    }
  }

  // Función para seleccionar el jugador
  seleccionarJugador(jugador: any) {
    this.jugadorSeleccionado = jugador;
  }

  // Función para resetear el jugador seleccionado (se puede llamar al cambiar entre vistas)
  resetJugadorSeleccionado() {
    this.jugadorSeleccionado = null;
  }
}
