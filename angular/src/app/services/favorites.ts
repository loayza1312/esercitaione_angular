import { Injectable } from '@angular/core';
import { CityHit } from './weather';

const KEY = 'meteo_favorites_v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private list: CityHit[] = [];

  constructor() {
    const saved = localStorage.getItem(KEY);
    this.list = saved ? JSON.parse(saved) : [];
  }

  all() { return [...this.list]; }

  isFav(id: string) { return this.list.some(c => c.id === id); }

  add(city: CityHit) {
    if (!this.isFav(city.id)) {
      this.list.push(city);
      this.persist();
    }
  }

  remove(id: string) {
    this.list = this.list.filter(c => c.id !== id);
    this.persist();
  }

  private persist() { localStorage.setItem(KEY, JSON.stringify(this.list)); }
}
