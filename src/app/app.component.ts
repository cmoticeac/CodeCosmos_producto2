import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaEquiposComponent } from './lista-equipos/lista-equipos.component';
import { CommonModule } from '@angular/common';

import listadoNombreEquipo from '../data/datos-equipos.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlayersComponent,
    DetailComponent,
    MediaComponent,
    InicioComponent,
    ListaEquiposComponent,
    CommonModule,
    BusquedaPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Cambiado a 'styleUrls'
})
export class AppComponent implements OnInit {
  // aquí se carga componente de ver equipos
  componenteVisible: boolean = false;
  nombreEquipo: any[] = [];
  equipoSeleccionado: string = '';

  componenteVerJugadores: boolean = false;

  ngOnInit(): void {
    this.componenteVerJugadores = false;
  }

  constructor() {
    this.nombreEquipo = listadoNombreEquipo;
    this.componenteVisible = false;
    this.componenteVerJugadores = false;
    this.equipoSeleccionado = '';
  }

  // Al pulsar el select de equipo
  onSelect(equipo: string) {
    this.muestraEquipos(equipo);
    this.equipoSeleccionado = equipo;
  }

  // hacer switch de ser visible el equipo
  muestraEquipos(equipo: string) {
    this.componenteVisible = true; //se ve el card de listado jugadores por equipo
    this.componenteVerJugadores = false; // no sale el filtro características de jugador
  }

  /**
   * cuando se pulsa el botón jugadores switch pasará a true
   */
  seleccionarJugadores() {
    this.componenteVerJugadores = true; // para el card del filtro
    this.componenteVisible = false; // no se ve el card de listado jugadores por equipo
  }
}
