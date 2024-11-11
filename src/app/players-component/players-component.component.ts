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
  players: Player[] = [];
  selectedPlayer: Player | null = null;
  newPlayer: Player = { idequipo: '', nombre: '', apellido: '', altura: '', posicion: '' , img1: '', img2: '', video:'', equipo: '', edad: 0, sexo: '', partidos: 0};
  searchText: string = '';
  searchPosition: string = '';
   @Input() inputBDData: any; 
   valueChange: any;   // Variable para mostrar el tipo de dato recibido


  // Lista de posiciones para el dropdown
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];
  //constructor(private playerService: PlayerService) {}
  
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.valueChange = this.inputBDData;  //si inicia
    this.loadPlayers(); // Cargar jugadores al iniciar
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
  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputBDData']) {
      this.valueChange = typeof changes['inputBDData'].currentValue;
      this.inputBDData = changes['inputBDData'].currentValue;
    }
  } 

  // CRUD: Cargar jugadores desde Firebase
  loadPlayers(): void {
    this.firebaseService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }

  // CRUD: Añadir un nuevo jugador
  addPlayer(): void {
    if (this.newPlayer.nombre && this.newPlayer.apellido && this.newPlayer.posicion) {
      this.firebaseService.addPlayer(this.newPlayer).then(() => {
        this.newPlayer = { idequipo: '', nombre: '', apellido: '', altura: '', posicion: '' , img1: '', img2: '', video:'', equipo: '', edad: 0, sexo: '', partidos: 0 };
        this.loadPlayers(); // Recargar sta de jugadores
      });
    }
  }

   // CRUD: Eliminar un jugador
   deletePlayer(playerId: string): void {
    this.firebaseService.deletePlayer(playerId).then(() => {
      this.loadPlayers(); // Recargar lista de jugadores
    });
  }

}// CIERRE CLASS
