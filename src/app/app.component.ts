import { Component, OnInit, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFilterPipe } from './pipes/player-filter.pipe';  // Importa correctamente el pipe de filtro
import { PlayersComponent } from './players-component/players-component.component';
import { DetailComponent } from './detail-component/detail-component.component';
import { MediaComponent } from './media-component/media-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { CommonModule } from '@angular/common';
import { PLAYER_DATA } from '../data/data';

 // importaciones para firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../environments/firebase.config";
import { getDatabase, ref, onValue, Database } from "firebase/database"; 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseService } from './firebase.service';

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
    AngularFireDatabaseModule, 
  ],
 
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  players = PLAYER_DATA;
  componenteVerJugadores: boolean = false;
   
    app = initializeApp(firebaseConfig);
    db : any;
    playersData: any;   // = snapshot.val(); // Get the data as a JavaScript object
 
  constructor() {
    console.log("ANTES");
    //
    AngularFireModule.initializeApp(firebaseConfig), // Usa firebaseConfig directamente
    this.db = getDatabase(this.app);
    var dgeneraCon= this.generarConexion();
    console.log("DESPUES");
  }

  ngOnInit(): void {
    this.componenteVerJugadores = false;
    
  }  

  generarConexion(): any {
    var connectedRef = ref(this.db, ".info/connected");
  
    return new Promise((resolve, reject) => {
      onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          console.log("conecta a Firebase Realtime Database Jugadores !");
        
          resolve(this.db);   
          const playersRef = ref(this.db, 'jugadores');
         
          // Read data from the database
          onValue(playersRef, (snapshot) => {
           const playersData = snapshot.val(); 
            this.playersData= snapshot.val();
            if (this.playersData) {
              console.log("Jugadores data:", this.playersData);              
              }
            else { console.log("No jugadores encontrados.");       }
          });
 
        } 
        else {
            console.log("No se conecta a jugadores deFirebase Realtime Database.");
          //  reject(new Error("fallo la conexión a la BD."));
          }
      });
    });
  }


}
 