import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Database, onValue, push, ref, remove, set, update } from '@angular/fire/database';
import { Storage, ref as storageRef, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Player } from '../app/models/players.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';


import { ref as dbRef, update as dbUpdate } from "firebase/database";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionPath = 'jugadores'; // Ruta en Realtime Database

  constructor(private db: Database, private storage: Storage) {}

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
    const playersRef = ref(this.db, this.collectionPath); // Referencia a la colección
    const newPlayerRef = push(playersRef); // Crea un nodo único
    await set(newPlayerRef, player); // Guarda los datos del jugador
  }  
  
  // Actualizar un jugador existente
  async updatePlayer(player: Player): Promise<void> {
    if (!player.firestoreId) {
      console.error('firestoreId es undefined');
      return;
    }
    // Referencia al nodo existente
  const playerRef = ref(this.db, `${this.collectionPath}/${player.firestoreId}`);
  // Actualizar el nodo existente
  await set(playerRef, player);
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
  
  async uploadFileAndUpdateDatabase(playerId: string, file: File, type: 'image' | 'video'): Promise<void> {
    try {
     
      const path = type === 'image' ? 'assets/imagenes' : 'assets/videos';
      const fileStorageRef = storageRef(this.storage, `${path}/${file.name}`);
 
      // Subir archivo al Storage
      await uploadBytes(fileStorageRef, file);
      const downloadURL = await getDownloadURL(fileStorageRef);
      console.log(`Archivo subido: ${downloadURL}`);
  
      // Actualizar la URL en Realtime Database
      const playerDbRef = ref(this.db, `jugadores/${playerId}`);
      const updateData = type === 'image' ? { img1: downloadURL } : { video: downloadURL };
  
      await update(playerDbRef, updateData);
      console.log(`URL actualizada en la base de datos.`);
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw error;
    }
     
      

    }

}