import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { getDatabase, update } from "firebase/database";
import { Database, ref, set, get, remove, onValue, push } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Player } from '../app/models/players.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionPath = 'jugadores'; // Ruta en Realtime Database

  constructor(private db: Database) {}

  // Obtener todos los jugadores
  getPlayers(): Observable<Player[]> {
    const playersRef = ref(this.db, this.collectionPath);
    return new Observable(subscriber => {
      onValue(playersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const players: Player[] = Object.keys(data).map(key => ({
            ...data[key],
            firestoreId: key, // Clave como identificador único
          }));
          subscriber.next(players);
        } else {
          subscriber.next([]);
        }
      }, error => {
        console.error('Error al obtener jugadores:', error);
        subscriber.error(error);
      });
    });
  }
  
  // Agregar un nuevo jugador
  async addPlayer(player: Player): Promise<void> {
    const playersRef = ref(this.db, this.collectionPath);
    const newPlayerRef = push(playersRef); // Genera una clave única
    const completePlayer = { ...player, firestoreId: newPlayerRef.key }; // Agrega el ID único
    await set(newPlayerRef, completePlayer);
  }
  
  

  // Actualizar un jugador existente
  async updatePlayer(player: Player): Promise<void> {
    if (!player.firestoreId) {
      console.error('firestoreId es undefined');
      return;
    }
    const playerRef = ref(this.db, `${this.collectionPath}/${player.firestoreId}`);
    await update(playerRef, player);
  }
  
  

  // Eliminar un jugador
  async deletePlayer(playerId: string): Promise<void> {
    if (!playerId) {
      console.error('Error: playerId es undefined');
      return;
    }
    const playerRef = ref(this.db, `${this.collectionPath}/${playerId}`);
    await remove(playerRef);
  }  
  
}