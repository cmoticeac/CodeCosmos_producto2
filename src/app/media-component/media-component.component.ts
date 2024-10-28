import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-component.component.html',
  styleUrls: ['./media-component.component.css'],
})

/*
 *  A.Incorporar los datos creados al componente
    B.Usando los eventos de comunicación de Angular,
     comunicar el item seleccionado en el listado aldetalle 
     para previsualizar los datos de ese detalle.
    C.Incorporar el HTML+CSS para diseñar el listado
    D.Incorporar los eventos dentro del componente para poder realizar el control de la multimedia
    E.Incorporar el listado a la aplicación
 */
export class MediaComponent implements OnInit {
  jugadorSeleccionado: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener los datos del jugador desde los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      this.jugadorSeleccionado = JSON.parse(params['jugador']);
    });
  }

  // Funciones para controlar el video
  playVideo(video: HTMLVideoElement) {
    video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  stopVideo(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0; // Reinicia el video
  }

  seekVideo(video: HTMLVideoElement, event: any) {
    const value = event.target.value;
    const seekTime = video.duration * (value / 100);
    video.currentTime = seekTime;
  }

  setVolume(video: HTMLVideoElement, event: any) {
    const value = event.target.value;
    video.volume = value;
  }
}
