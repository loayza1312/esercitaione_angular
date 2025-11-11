import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



export interface CityHit {
  id: string;        // es: "45.46,9.19"
  name: string;      // nome città
  country: string;   // paese
  lat: number;       // latitudine
  lon: number;       // longitudine
  admin1?: string;   // regione o provincia (opzionale)
}


@Injectable({ providedIn: 'root' })
export class WeatherService {
  private geoBase = 'https://geocoding-api.open-meteo.com/v1/search';
  private wxBase  = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  // 1) Cerca città -> lat/lon
  searchCities(query: string) {
    const url = `${this.geoBase}?name=${encodeURIComponent(query)}&count=10&language=it`;
    return this.http.get<any>(url).pipe(
      map(r => (r?.results || []).map((c: any) => ({
        id: `${c.latitude},${c.longitude}`,
        name: c.name,
        country: c.country,
        lat: c.latitude,
        lon: c.longitude,
        admin1: c.admin1
      })))
    );
  }

  // 2) Dati meteo usando lat/lon
  getForecast(lat: number, lon: number) {
    const p = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      current: 'temperature_2m,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
      timezone: 'auto'
    });
    return this.http.get<any>(`${this.wxBase}?${p.toString()}`);
  }
}
