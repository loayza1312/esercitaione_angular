import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService); // providedIn: 'root' -> ok senza providers
    // pulisco lo storage per test indipendenti
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds and lists favorites', () => {
    service.add({ id: '45,9', name: 'Milano', country: 'IT', lat: 45, lon: 9 });
    const all = service.all();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe('Milano');
  });

  it('does not duplicate the same favorite', () => {
    const city = { id: '45,9', name: 'Milano', country: 'IT', lat: 45, lon: 9 };
    service.add(city);
    service.add(city);
    expect(service.all().length).toBe(1);
  });

  it('removes a favorite', () => {
    const id = '45,9';
    service.add({ id, name: 'Milano', country: 'IT', lat: 45, lon: 9 });
    service.remove(id);
    expect(service.all().length).toBe(0);
  });

  it('isFav works', () => {
    const id = '45,9';
    service.add({ id, name: 'Milano', country: 'IT', lat: 45, lon: 9 });
    expect(service.isFav(id)).toBeTrue();
    expect(service.isFav('0,0')).toBeFalse();
  });
});

