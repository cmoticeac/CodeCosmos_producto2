import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../models/players.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerFilterPipe } from '../pipes/player-filter.pipe';
import { FirebaseService } from '../firebase.service';
import { firebaseConfig } from '../../environments/firebase.config';

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DetailComponent,
    PlayerFilterPipe,
  ],
  providers: [FirebaseService],
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})
export class PlayersComponent implements OnInit, OnChanges { 
  @Input() inputBDData: Player[] = [];
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  selectedPlayer: Player | null = null;
  newPlayer: Player = { id: 0, nombre: '', apellido: '', altura: 0, posicion: '', img1: '', img2: '', video: '', edad: 0, sexo: '', partidos: 0 };
  searchText: string = '';
  searchPosition: string = '';
  showNewPlayerForm = false;

  // Lista de posiciones para el dropdown
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];
  //constructor(private playerService: PlayerService) {}
  
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }
  
  loadPlayers(): void {
    this.firebaseService.getPlayers().subscribe(players => {
      console.log("Datos de jugadores:", players); // Verifica que los datos están llegando aquí
      this.players = players;
      this.filteredPlayers = players;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputBDData']) {
      this.players = changes['inputBDData'].currentValue || [];
      this.filteredPlayers = this.players;
    }
  }

   // Función para buscar jugadores según el nombre y la posición
   buscarJugador(): void {
    this.filteredPlayers = this.players.filter(player => {
      const nameMatch = this.searchText ? player.nombre.toLowerCase().includes(this.searchText.toLowerCase()) : true;
      const positionMatch = this.searchPosition ? player.posicion.toLowerCase() === this.searchPosition.toLowerCase() : true;
      return nameMatch && positionMatch;
    });
  }
  ngAfterViewInit() {
    console.log("Valores de jugadores pasados desde el padre:");
      for (const playerId in this.inputBDData) {
        if (this.inputBDData.hasOwnProperty(playerId)) {
          const player = this.inputBDData[playerId];
          console.log(`Player ${playerId}:`, player);
        } else {
          console.log("Error al procesar jugadores");
        }
      }
  }
  
// Seleccionar un jugador para editar
  selectPlayer(player: Player): void {
    this.selectedPlayer = { ...player }; // Crear una copia para editar sin modificar original
  }

  deselectPlayer(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedPlayer = null;
  }
  
  /**
   * este evento cada vez que hay un cambio recibido del app.componet( Es el padre)
   * @param changes 
   */
 

  // CRUD: Añadir un nuevo jugador
  // Agregar un nuevo jugador
  addPlayer(): void {
    this.firebaseService.addPlayer(this.newPlayer).then(() => {
      this.loadPlayers();
      this.showNewPlayerForm = false;
    });
  }

   // CRUD: Eliminar un jugador
   deletePlayer(playerId: number): void {
    this.firebaseService.deletePlayer(playerId).then(() => {
      this.loadPlayers(); // Recargar lista de jugadores
      });
    }
    newPlayerForm(): void {
      this.newPlayer = { id: 0, nombre: '', apellido: '', edad: 0, sexo: '', posicion: '', altura: 0, partidos: 0, img1: '', img2: '', video: '' };
    }

      // Actualizar un jugador
  updatePlayers(player: Player): void {
    this.firebaseService.updatePlayer(player).then(() => {
      this.loadPlayers();
      this.deselectPlayer();
    });
  }

}
