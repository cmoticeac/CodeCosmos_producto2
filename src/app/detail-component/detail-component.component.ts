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
  @Input() selectedPlayer: any = null;
  @Output() closeDetailEvent = new EventEmitter<void>();
  @Output() savePlayerEvent = new EventEmitter<any>();

  closeDetail() {
    this.closeDetailEvent.emit();
  }

  savePlayer() {
    this.savePlayerEvent.emit(this.selectedPlayer);
  }
}