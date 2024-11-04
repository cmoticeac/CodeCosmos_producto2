import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/players.model';

@Pipe({
  name: 'playerFilter',
  standalone: true,
})
export class PlayerFilterPipe implements PipeTransform {
  transform(players: Player[], name: string = '', position: string = ''): Player[] {
    return players.filter(player => {
      const nameMatch = name ? player.nombre.toLowerCase().includes(name.toLowerCase()) : true;
      const positionMatch = position ? player.posicion.toLowerCase() === position.toLowerCase() : true;
      return nameMatch && positionMatch;
    });
  }
}