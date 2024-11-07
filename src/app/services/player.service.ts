import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/players.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private db: Database) {}
  

  getPlayers(): Observable<Player[]> {
    const dbRef = ref(this.db);
    const playersPromise = get(child(dbRef, 'players'));

    return from(playersPromise).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val() as Player[]; // Asegúrate de que este tipo coincida con tu modelo de datos
        } else {
          return [];
        }
      })
    );
  }
}