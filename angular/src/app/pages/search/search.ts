import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  query = '';
  results: any[] = [];
  loading = false;
  error = '';
  tried = false;

  constructor(private wx: WeatherService) {}

  search() {
    const q = this.query.trim();
    if (!q) return;
    this.loading = true; this.error = ''; this.results = []; this.tried = true;
    this.wx.searchCities(q).subscribe({
      next: rows => { this.results = rows; this.loading = false; },
      error: () => { this.error = 'Errore di rete. Riprova.'; this.loading = false; }
    });
  }
}
