import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { getDatabase, update, ref } from "firebase/database";
import { Observable } from 'rxjs';
import { Player } from '../app/models/players.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionPath = 'jugadores'; // Ruta de la colección en Firestore
  constructor(private firestore: Firestore, private db: AngularFireDatabase) {}

  // Obtener todos los jugadores
  getPlayers(): Observable<Player[]> {
    return this.db.list<Player>("jugadores").valueChanges();
  }
  
  // Agregar un nuevo jugador
  async addPlayer(player: Player): Promise<void> {
    const playersCollection = collection(this.firestore, this.collectionPath);
    await addDoc(playersCollection, player);
  }

  // Actualizar un jugador existente
  async updatePlayer(player: Player): Promise<void> {
    let db = getDatabase();
    let updateDoc: any = {};
    updateDoc["/" + this.collectionPath + "/" + player.id] =  player;
    return update(ref(db), updateDoc);
  }

  // Eliminar un jugador
  async deletePlayer(playerFirestoreId: string): Promise<void> {
    const playerDoc = doc(this.firestore, `${this.collectionPath}/${playerFirestoreId}`);
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