import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private fav: FavoritesService) {}

  ngOnInit() {
    this.favorites = this.fav.all();
  }

  remove(id: string) {
    this.fav.remove(id);
    this.favorites = this.fav.all();
  }
}
