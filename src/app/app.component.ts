import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFilterPipe } from './pipes/player-filter.pipe';  // Importa correctamente el pipe de filtro
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';
import { PLAYER_DATA } from '../data/data';

import { getDatabase, ref, onValue } from "firebase/database";
 
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../environments/firebase.config";
import { databaseInstance$ } from '@angular/fire/database';
 


@Component({
  selector: 'app-root',
  standalone: true,
 
  imports: [ 
    RouterOutlet,  PlayersComponent,    DetailComponent,  MediaComponent, 
    InicioComponent,  CommonModule,  PlayerFilterPipe,
    BrowserModule
       
  ],
 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  players = PLAYER_DATA;
  componenteVerJugadores: boolean = false;
  
  ngOnInit(): void {
    this.componenteVerJugadores = false;
    
  }  
}
  console.log("antes");
  const app = initializeApp(firebaseConfig);
 
  async function connectToDatabase() {
    const db = getDatabase(app); // Pass the initialized app to getDatabase()
    const connectedRef = ref(db, ".info/connected");
  
    return new Promise((resolve, reject) => {
      onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          console.log("Connected to Firebase Realtime Database!");
         

          resolve(db); // Resolve the promise with the database instance

          const playersRef = ref(db, 'jugadores');
         
          // Read data from the database
          onValue(playersRef, (snapshot) => {
            const jugadoresData = snapshot.val(); // Get the data as a JavaScript object

            // Process the data
            if (jugadoresData) {
              console.log("Jugadores data:", jugadoresData);

              // Access individual player data
              for (const playerId in jugadoresData) {
                if (jugadoresData.hasOwnProperty(playerId)) {
                  const player = jugadoresData[playerId];
                  console.log(`Player ${playerId}:`);
                  console.log("  Nombre:", player.nombre);
                  console.log("  Apellido:", player.apellido);
                  console.log("  Altura:", player.altura);
                  // ... access other properties
                }
              }
  } else {
    console.log("No jugadores data found.");
  }
});

        
  
   
  
 
          
 

 
        } else {
          console.log("Not connected to Firebase Realtime Database.");
          reject(new Error("Failed to connect to the database."));
        }
      });
    });
  }
  
  async function main() {
    try {
      const db = await connectToDatabase();
      // Your database is ready to use here
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }
  
  main();
 
 
 

console.log("despues");