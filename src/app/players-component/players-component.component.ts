import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/players.model';

@Component({
  selector: 'app-players-component',
  standalone: true,
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  selectedPlayer: Player | null = null;
  searchText: string = '';
  searchPosition: string = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
      console.log("Players from Firestore:", players);
    });
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  deselectPlayer() {
    this.selectedPlayer = null;
  }
}