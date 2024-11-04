import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLAYER_DATA } from '../../data/data';  
import { Player } from '../models/players.model';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerFilterPipe } from '../pipes/player-filter.pipe';

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailComponent, PlayerFilterPipe],
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = PLAYER_DATA;
  selectedPlayer: Player | null = null;
  searchText: string = '';
  searchPosition: string = '';

  // Lista de posiciones para el dropdown
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];

  ngOnInit(): void {}

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  deselectPlayer() {
    this.selectedPlayer = null;
  }
}