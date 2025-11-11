import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService, CityHit } from '../../services/weather';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-weather.html',
  styleUrls: ['./city-weather.css']
})
export class CityWeatherComponent {
  id = ''; coords = ''; name = '';
  data: any; loaded = false; error = ''; isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private wx: WeatherService,
    private fav: FavoritesService
  ) {
    this.route.paramMap.subscribe(pm => {
      this.id = pm.get('id') || '';
      const [lat, lon] = this.id.split(',').map(Number);
      this.coords = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      this.loaded = false; this.error = '';
      this.wx.getForecast(lat, lon).subscribe({
        next: (res) => { this.data = res; this.loaded = true; this.refreshFav(); },
        error: () => { this.error = 'Impossibile caricare i dati meteo.'; this.loaded = true; }
      });

      const nav = history.state?.city as CityHit | undefined;
      this.name = nav ? `${nav.name}${nav.country ? ' — '+nav.country : ''}` : this.coords;
    });
  }

  refreshFav(){ this.isFavorite = this.fav.isFav(this.id); }
  toggleFav(){
    const [lat, lon] = this.id.split(',').map(Number);
    const city = { id: this.id, name: this.name || this.coords, country: '', lat, lon };
    this.isFavorite ? this.fav.remove(this.id) : this.fav.add(city);
    this.refreshFav();
  }

  // === UI helpers: icona e descrizione da weather_code ===
  iconFor(code?: number){
    const m: Record<number,string> = {
      0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️',
      45:'🌫️', 48:'🌫️',
      51:'🌦️', 53:'🌦️', 55:'🌧️',
      61:'🌧️', 63:'🌧️', 65:'🌧️',
      71:'🌨️', 73:'🌨️', 75:'❄️',
      80:'🌧️', 81:'🌧️', 82:'⛈️',
      95:'⛈️', 96:'⛈️', 99:'⛈️'
    };
    return m[code ?? 3] ?? '🌡️';
  }
  labelFor(code?: number){
    const m: Record<number,string> = {
      0:'Sereno',1:'Poco nuvoloso',2:'Variabile',3:'Nuvoloso',
      45:'Nebbia',48:'Nebbia',
      51:'Pioviggine',53:'Pioviggine',55:'Pioviggine intensa',
      61:'Pioggia',63:'Pioggia',65:'Pioggia forte',
      71:'Neve',73:'Neve',75:'Neve forte',
      80:'Rovesci',81:'Rovesci',82:'Rovesci forti',
      95:'Temporali',96:'Temporali',99:'Temporali'
    };
    return m[code ?? 3] ?? 'Meteo';
  }
}
