import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../app/models/players.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionPath = 'players'; // Ruta de la colección en Firestore

  constructor(private firestore: Firestore) {}

  // Obtener todos los jugadores
  getPlayers(): Observable<Player[]> {
    const playersCollection = collection(this.firestore, this.collectionPath);
    return collectionData(playersCollection, { idField: 'idequipo' }) as Observable<Player[]>;
  }

  // Agregar un nuevo jugador
  async addPlayer(player: Player): Promise<void> {
    const playersCollection = collection(this.firestore, this.collectionPath);
    await addDoc(playersCollection, player);
  }

  // Actualizar un jugador existente
  async updatePlayer(player: Player): Promise<void> {
    const playerDoc = doc(this.firestore, `${this.collectionPath}/${player.id}`);
    await updateDoc(playerDoc, { ...player });
  }

  // Eliminar un jugador
  async deletePlayer(playerId: number): Promise<void> {
    const playerDoc = doc(this.firestore, `${this.collectionPath}/${playerId}`);
    await deleteDoc(playerDoc);
  }
}

/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
}
*/