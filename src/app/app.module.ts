import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes que uses...
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: provideFirebaseApp,
      useFactory: () => initializeApp(environment.firebaseConfig),
    },
    {
      provide: provideFirestore,
      useFactory: () => getFirestore(),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}