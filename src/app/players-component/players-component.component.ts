import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
//import { PlayerService } from '../services/player.service';
import { Player } from '../models/players.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerFilterPipe } from '../pipes/player-filter.pipe';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DetailComponent,
    PlayerFilterPipe,
  ],
  templateUrl: './players-component.component.html',
  styleUrls: ['./players-component.component.css'],
})

export class PlayersComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() inputBDData: any;
  
  players: Player[] = [];
  selectedPlayer: Player | null = null;
  newPlayer: Player = { id: '', nombre: '', apellido: '', altura: 0, posicion: '' };
  valueChange: any;   // Variable para mostrar el tipo de dato recibido
  searchText: string = '';
  searchPosition: string = '';
  
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.valueChange = this.inputBDData;
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

  // Seleccionar un jugador para editar
  selectPlayer(player: Player): void {
    this.selectedPlayer = { ...player }; // Crear una copia para editar sin modificar original
  }

  // Deseleccionar el jugador actual
  deselectPlayer(): void {
    this.selectedPlayer = null;
  }

  // CRUD: Añadir un nuevo jugador
  addPlayer(): void {
    if (this.newPlayer.nombre && this.newPlayer.apellido && this.newPlayer.posicion) {
      this.firebaseService.addPlayer(this.newPlayer).then(() => {
        this.newPlayer = { id: '', nombre: '', apellido: '', altura: 0, posicion: '' };
        this.loadPlayers(); // Recargar lista de jugadores
      });
    }
  }

  // CRUD: Guardar cambios del jugador seleccionado
  savePlayer(): void {
    if (this.selectedPlayer) {
      this.firebaseService.updatePlayer(this.selectedPlayer).then(() => {
        this.deselectPlayer();
        this.loadPlayers(); // Recargar lista de jugadores
      });
    }
  }

  // CRUD: Eliminar un jugador
  deletePlayer(playerId: string): void {
    this.firebaseService.deletePlayer(playerId).then(() => {
      this.loadPlayers(); // Recargar lista de jugadores
    });
  }
}

/*export class PlayersComponent implements OnInit, OnChanges { 
  players: Player[] = [];
  selectedPlayer: Player | null = null;
  searchText: string = '';
  searchPosition: string = '';
   @Input() inputBDData: any; 
   valueChange: any;   // Variable para mostrar el tipo de dato recibido


  // Lista de posiciones para el dropdown
  positions: string[] = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];
  //constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.valueChange = this.inputBDData;  //si inicia

  }
  
  ngAfterViewInit() {
    console.log("AQUI SON LOS VALRES DE JUGADORES PASADOS PADRE");

    
      // se debe controlar que no sea vacio 
    for (const playerId in this.inputBDData) {
      if (this.inputBDData.hasOwnProperty(playerId)) {
        const player = this.inputBDData[playerId];
        console.log(`Player ${playerId}:`);
        console.log("  Nombre:", player.nombre);
        console.log("  Apellido:", player.apellido);
        console.log("  Altura:", player.altura);
      
      }
      else 
       { console.log(Error)}
    }
  }
  
  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  deselectPlayer() {
    this.selectedPlayer = null;
  }
  
  
   este evento cada vez que hay un cambio recibido del app.componet( Es el padre)
   @param changes 
   
  ngOnChanges(changes: SimpleChanges) {
    if (changes['receivedVariable']) {
    
      const newValue = changes['this.inputBDData'].currentValue;
      this.valueChange = typeof newValue;
      this.inputBDData=this.valueChange;  // se actualiza el valor recibido 
     

      // Puedes realizar cualquier otro tratamiento aquí
      console.log("entra cada vez que recibe o cambia valor");
      console.log('Nuevo valor recibido:', newValue);
      console.log('Tipo de la variable recibida:', this.inputBDData);
    }

  }  



} */ // CIERRE CLASS
 

