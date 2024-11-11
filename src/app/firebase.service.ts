import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Player } from '../app/models/players.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionPath = 'players'; // Ruta de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los jugadores
  getPlayers(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Agregar un nuevo jugador
  addPlayer(player: Player): Promise<void> {
    const id = this.firestore.createId(); // Crea un ID único para el jugador
    return this.firestore.collection(this.collectionPath).doc(id).set({ ...player, id });
  }

  // Actualizar un jugador existente
  updatePlayer(player: Player): Promise<void> {
    return this.firestore.collection(this.collectionPath).doc(player.id).update(player);
  }

  // Eliminar un jugador
  deletePlayer(playerId: string): Promise<void> {
    return this.firestore.collection(this.collectionPath).doc(playerId).delete();
  }
}
