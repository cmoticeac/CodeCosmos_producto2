import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFilterPipe } from './pipes/player-filter.pipe';  // Importa correctamente el pipe de filtro
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';
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
    PlayerFilterPipe,  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  players = PLAYER_DATA;
  componenteVerJugadores: boolean = false;

  ngOnInit(): void {
    this.componenteVerJugadores = false;
  }

}
