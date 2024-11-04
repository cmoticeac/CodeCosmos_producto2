import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-component',
  standalone: true, // Agregar esta línea para que sea standalone
  imports: [CommonModule],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css'],
})
export class DetailComponent {
  @Input() selectedPlayer: any = null;
  @Output() closeDetailEvent = new EventEmitter<void>();  // Evento para cerrar el detalle

  closeDetail() {
    this.closeDetailEvent.emit();  // Emitimos el evento para cerrar el detalle
  }
}