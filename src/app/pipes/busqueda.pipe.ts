import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda',
  standalone: true
})
export class BusquedaPipe implements PipeTransform {

  transform(items: any[], searchText: string, filtro: string): any[] {
    if (!items) return [];
    if (!searchText && !filtro) return items;

    searchText = searchText ? searchText.toLowerCase() : '';
    filtro = filtro ? filtro.toLowerCase() : '';

    return items.filter(item => {
      const matchNombre = item.nombre.toLowerCase().includes(searchText);
      const matchFiltro = filtro ? item.posicion.toLowerCase() === filtro : true;
      return matchNombre && matchFiltro;
    });
  }
}
