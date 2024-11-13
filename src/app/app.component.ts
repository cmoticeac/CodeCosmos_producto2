import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFilterPipe } from './pipes/player-filter.pipe';
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';
import { PLAYER_DATA } from '../data/data';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../environments/firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";
import { FirebaseService } from './firebase.service';
import { get } from "firebase/database";

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
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  playersData: any[] = [];
  app = initializeApp(firebaseConfig);
  db: any;

  constructor() {
    this.db = getDatabase(this.app);
    this.generarConexion();
  }

  ngOnInit(): void {}

  generarConexion(): void {
    const playersRef = ref(this.db, 'jugadores');
    get(playersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const playersData = snapshot.val(); 
          this.playersData = playersData ? Object.values(playersData) : [];
          console.log("Jugadores data:", this.playersData);
        } else {
          console.log("No hay datos disponibles.");
          this.playersData = [];
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de jugadores:", error);
      });
  }
}