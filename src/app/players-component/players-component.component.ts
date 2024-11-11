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
  selectedPlayer: Player | null = null;
  newPlayer: Player = { id: 0, nombre: '', apellido: '', altura: 0, posicion: '', img1: '', img2: '', video: '', edad: 0, sexo: '', partidos: 0 };
  searchText: string = '';
  searchPosition: string = '';

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
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputBDData']) {
      this.players = changes['inputBDData'].currentValue || [];
    }
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

      // Deseleccionar el jugador actual
      deselectPlayer(): void {
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
      this.newPlayerForm(); // Resetear el formulario de nuevo jugador
    });
  }

   // CRUD: Eliminar un jugador
   deletePlayer(playerId: number): void {
    this.firebaseService.deletePlayer(playerId).then(() => {
      this.loadPlayers(); // Recargar lista de jugadores
      });
    }
    newPlayerForm(): void {
      this.selectedPlayer = { id: 0, nombre: '', apellido: '', altura: 0, posicion: '', img1: '', img2: '', video: '', edad: 0, sexo: '', partidos: 0 };
    }

      // Actualizar un jugador
  updatePlayers(player: Player): void {
    this.firebaseService.updatePlayer(player).then(() => {
      this.loadPlayers();
      this.deselectPlayer();
    });
  }

}// CIERRE CLASS
