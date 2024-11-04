import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-component',
  standalone: true, // Agregar esta línea para que sea standalone
  imports: [CommonModule],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css'],
})
export class DetailComponent {
  @Input() selectedPlayer: any = null;

  resetPlayerSelection() {
    this.selectedPlayer = null;
  }
}