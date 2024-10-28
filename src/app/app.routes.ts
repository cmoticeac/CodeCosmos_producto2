import { Routes } from '@angular/router';
import { PlayersComponent } from './players-component/players-component.component';
import { MediaComponent } from './media-component/media-component.component';  // Importa el MediaComponent

export const routes: Routes = [
  { path: '', component: PlayersComponent },
  { path: 'media', component: MediaComponent }  // Nueva ruta para el componente Media
];
