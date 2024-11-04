import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';

// Importamos PLAYER_DATA en lugar del JSON
import { PLAYER_DATA } from '../data/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlayersComponent,
    DetailComponent,
    MediaComponent,
    InicioComponent,
    CommonModule,
    BusquedaPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  componenteVisible: boolean = false;
  nombreEquipo: any[] = PLAYER_DATA;
  equipoSeleccionado: string = '';
  componenteVerJugadores: boolean = false;

  ngOnInit(): void {
    this.componenteVerJugadores = false;
  }

  // Al pulsar el select de equipo
  onSelect(equipo: string) {
    this.muestraEquipos(equipo);
    this.equipoSeleccionado = equipo;
  }

  muestraEquipos(equipo: string) {
    this.componenteVisible = true;
    this.componenteVerJugadores = false;
  }

  seleccionarJugadores() {
    this.componenteVerJugadores = true;
    this.componenteVisible = false;
  }
}