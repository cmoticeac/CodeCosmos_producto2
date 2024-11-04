import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../models/players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private firestore: Firestore) { }
   // Obtener todos los jugadores
   getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players'); // Nombre de la colección en Firestore
    return collectionData(playersRef, { idField: 'id' }) as Observable<Player[]>;
  }

}
