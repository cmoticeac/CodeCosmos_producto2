import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}

  // Método para leer datos desde una colección llamada "items"
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, 'items');
    return collectionData(itemsCollection);
  }

  // Método para agregar un nuevo documento a la colección "items"
  addItem(data: any) {
    const itemsCollection = collection(this.firestore, 'items');
    return addDoc(itemsCollection, data);
  }
}