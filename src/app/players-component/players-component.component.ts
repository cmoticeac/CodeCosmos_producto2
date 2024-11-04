import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail-component/detail-component.component';
import { BusquedaPipe } from '../pipes/busqueda.pipe';
import { PLAYER_DATA } from '../../data/data';  // Importamos los datos directamente
import { Player } from '../models/players.model';  // Importamos la interfaz Player

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [CommonModule, FormsModule, DetailComponent, BusquedaPipe],
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})
export class PlayersComponent implements OnInit {
  posicionSeleccionada: string = '';
  searchText: string = '';
  players: Player[] = PLAYER_DATA; // Usamos el tipo Player[]
  playerFound: Player | null = null;
  noPlayerFound: boolean = false;

  ngOnInit(): void {
    // No es necesario cargar datos, ya están en PLAYER_DATA
  }

  // Método para realizar la búsqueda
  performSearch() {
    const result = this.players.filter((player: Player) => {
      const nameMatch = player.nombre.toLowerCase().includes(this.searchText.toLowerCase());
      const positionMatch = this.posicionSeleccionada ? 
                            player.posicion.toLowerCase() === this.posicionSeleccionada.toLowerCase() : 
                            true;
      return nameMatch && positionMatch;
    });

    if (result.length > 0) {
      this.playerFound = result[0];
      this.noPlayerFound = false;
    } else {
      this.playerFound = null;
      this.noPlayerFound = true;
    }
  }

  // Método para resetear la búsqueda
  resetSearch() {
    this.searchText = '';
    this.posicionSeleccionada = '';
    this.playerFound = null;
    this.noPlayerFound = false;
  }
}