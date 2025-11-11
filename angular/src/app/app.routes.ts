import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SearchComponent } from './pages/search/search';
import { FavoritesComponent } from './pages/favorites/favorites';
import { CityWeatherComponent } from './pages/city-weather/city-weather';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'city/:id', component: CityWeatherComponent },
  { path: '**', redirectTo: '' }
];
