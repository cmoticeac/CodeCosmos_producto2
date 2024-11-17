import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Asegúrate de que FormsModule esté aquí
  ],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css'],
})
export class DetailComponent {
positions: any[] = [ "Base", "Escolta", "Alero", "Ala-pívot", "Pívot" ];
images: any[] = [
  {"link": "assets/imagenes/player01_01.png", "name": "Player 01"},
  {"link": "assets/imagenes/player02_01.png", "name": "Player 02"},
  {"link": "assets/imagenes/player03_01.png", "name": "Player 03"},
  {"link": "assets/imagenes/player04_01.png", "name": "Player 04"},
  {"link": "assets/imagenes/player05_01.png", "name": "Player 05"},
  {"link": "assets/imagenes/player06_01.png", "name": "Player 06"}

];
  toggleEdit() {
    this.readonly = !this.readonly;
  }
  
  @Input() selectedPlayer: any = null;
  @Output() closeDetailEvent = new EventEmitter<void>();
  @Output() savePlayerEvent = new EventEmitter<any>();
  readonly: boolean = true;
  videos: any[] = [];

  ngOnInit(): void {
    this.videos.push({ "link": "assets/videos/player01.mp4", "name": "Player 01"});
    this.videos.push({ "link": "assets/videos/player02.mp4", "name": "Player 02"});
    this.videos.push({ "link": "assets/videos/player03.mp4", "name": "Player 03"});
    this.videos.push({ "link": "assets/videos/player04.mp4", "name": "Player 04"});
    this.videos.push({ "link": "assets/videos/player05.mp4", "name": "Player 05"});
    this.videos.push({ "link": "assets/videos/player06.mp4", "name": "Player 06"});
  }

  closeDetail() {
    this.closeDetailEvent.emit();
  }

  savePlayer() {
    this.savePlayerEvent.emit(this.selectedPlayer);
  }
}