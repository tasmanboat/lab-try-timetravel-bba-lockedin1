import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { HeroesComponent } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
    // this.resetLocalStorageHeroes();
    this.heroes = JSON.parse(localStorage.getItem('heroes')!);
    if (!this.heroes) {
      this.heroes = [
        { id: 11, name: 'Dr Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ];
    }
  }
  heroes?: Hero[];

  /*
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }
  */
  createDb() {
    return { heroes: this.heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id))+1 : 11;
  }

  responseInterceptor(res: ResponseOptions, ri: RequestInfo): ResponseOptions {
    // console.log((ri as any)?.url);
    // console.log((ri as any)?.method);
    // console.log(res.body);
    // console.log(Array.isArray(res.body));
    if ((ri as any)?.url === `api/heroes` && (ri as any)?.method === `get`) {
      this.setLocalStorageHeroes(res.body as Hero[])
      console.log(`(InMemoryDataService) setLocalStorageHeroes`);
    }
    return res;
  }

  setLocalStorageHeroes(heroes: Hero[]): void {
    localStorage.setItem('heroes', JSON.stringify(heroes))
  }

  resetLocalStorageHeroes(): void {
    localStorage.removeItem('heroes');
    // localStorage.clear();
  }

}
