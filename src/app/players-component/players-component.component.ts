import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from '../models/players.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerFilterPipe } from '../pipes/player-filter.pipe';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';

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
  selectedPlayer: any;
  newPlayer: Player = { id: 0, nombre: '', apellido: '', altura: 0, posicion: '', img1: '', img2: '', video: '', edad: 0, sexo: '', partidos: 0, firestoreId: '' };
  searchText: string = '';
  searchPosition: string = '';
  showNewPlayerForm = false;
  viewOnlyPlayer: Player | null = null;

  // Lista de posiciones para el dropdown
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];
  //constructor(private playerService: PlayerService) {}
  
  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.loadPlayers(); // Carga los datos al inicializar el componente
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputBDData']) {
      this.filteredPlayers = this.inputBDData || [];
    }
  }

   // Buscar jugadores por nombre y posición
   buscarJugador(): void {
    this.filteredPlayers = this.players.filter(player => {
      const nameMatch = this.searchText ? player.nombre.toLowerCase().includes(this.searchText.toLowerCase()) : true;
      const positionMatch = this.searchPosition ? player.posicion.toLowerCase() === this.searchPosition.toLowerCase() : true;
      return nameMatch && positionMatch;
    });
  }
  
  loadPlayers(): void {
    this.firebaseService.getPlayers().subscribe(players => {
      console.log('Jugadores recuperados desde Firebase:', players);
      this.players = players || [];
      this.filteredPlayers = [...this.players]; // Aplica filtro inicial si es necesario
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
  addPlayer(): void {
    if (!this.newPlayer.nombre || !this.newPlayer.apellido) {
      console.error('Nombre y apellido son obligatorios');
      return;
    }
    console.log("Añadiendo nuevo jugador:", this.newPlayer);
    this.firebaseService.addPlayer(this.newPlayer).then(() => {
      console.log('Jugador añadido exitosamente');
      this.loadPlayers(); // Recargar lista
      this.showNewPlayerForm = false;
    }).catch(error => {
      console.error('Error al añadir jugador:', error);
    });
  }
  
  
   // CRUD: Eliminar un jugador
  deletePlayer(player: Player): void {
    if (!player.firestoreId) {
      console.error('Error: firestoreId es undefined');
      return;
    }
    this.firebaseService.deletePlayer(player.firestoreId).then(() => {
      this.loadPlayers(); // Recarga los jugadores
      this.cancelNewPlayer();
    }).catch(error => {
      console.error('Error al eliminar jugador:', error);
    });
  }
  
  newPlayerForm(): void {
    this.newPlayer = { id: 0, nombre: '', apellido: '', edad: 0, sexo: '', posicion: '', altura: 0, partidos: 0, img1: '', img2: '', video: '', firestoreId: '' };
    this.showNewPlayerForm = true;
  }

      // Actualizar un jugador
  updatePlayers(player: Player): void {
    this.firebaseService.updatePlayer(player).then(() => {
      this.loadPlayers(); // Recargar lista de jugadores después de actualizar
      this.deselectPlayer();
    });
  }

  cancelNewPlayer(): void {
    this.newPlayer = { 
      id: 0, nombre: '', apellido: '', altura: 0, posicion: '', 
      img1: '', img2: '', video: '', edad: 0, sexo: '', partidos: 0, firestoreId: '' 
    }; // Limpia el formulario
    this.showNewPlayerForm = false; // Cierra el formulario
  }
  
  onNewPlayerImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file && this.newPlayer.firestoreId) {
      this.firebaseService.uploadFileAndUpdateDatabase(this.newPlayer.firestoreId, file, 'image')
        .then(() => console.log('Imagen subida correctamente.'))
        .catch(error => console.error('Error al subir la imagen:', error));
    }
  }
  
  onNewPlayerVideoUpload(event: any): void {
    const file = event.target.files[0];
    if (file && this.newPlayer.firestoreId) {
      this.firebaseService.uploadFileAndUpdateDatabase(this.newPlayer.firestoreId, file, 'video')
        .then(() => console.log('Video subido correctamente.'))
        .catch(error => console.error('Error al subir el video:', error));
    }
  }  
  
  viewDetails(player: Player): void {
    this.viewOnlyPlayer = player;
  }
  
  closeViewDetails(): void {
    this.viewOnlyPlayer = null;
  }
}
