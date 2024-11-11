import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
//import { PlayerService } from '../services/player.service';
import { Player } from '../models/players.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerFilterPipe } from '../pipes/player-filter.pipe';

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
export class PlayersComponent implements OnInit, OnChanges { 
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
  
  /**
   * este evento cada vez que hay un cambio recibido del app.componet( Es el padre)
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['receivedVariable']) {
    
      const newValue = changes['this.inputBDData'].currentValue;
      this.valueChange = typeof newValue;
      this.inputBDData=this.valueChange;  // se actualiza el valor recibido 
     

      // Puedes realizar cualquier otro tratamiento aquí
      /*console.log("entra cada vez que recibe o cambia valor");
      console.log('Nuevo valor recibido:', newValue);
      console.log('Tipo de la variable recibida:', this.inputBDData);*/
    }

  }  



}  // CIERRE CLASS
 

