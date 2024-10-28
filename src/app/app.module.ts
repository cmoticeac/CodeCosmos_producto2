import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { AppComponent } from './app.component';
import { ListaEquiposComponent } from './lista-equipos/lista-equipos.component';
import { ServicioCliente } from './servicio-cliente/servicio-cliente.component';

@NgModule({
  imports: [BrowserModule],
  providers: [
    ServicioCliente,
    provideHttpClient(),
    importProvidersFrom(AppComponent), // Importa el AppComponent como standalone
    importProvidersFrom(ListaEquiposComponent), // Importa ListaEquiposComponent como standalone
  ],
  //bootstrap: [AppComponent]
})
export class AppModule {}
