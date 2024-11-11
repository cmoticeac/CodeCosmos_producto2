import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {provideDatabase, getDatabase } from '@angular/fire/database'; 
import { firebaseConfig } from './environments/firebase.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Usa firebaseConfig aquí sin production
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
