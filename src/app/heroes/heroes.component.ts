import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // hero = 'Windstorm';
  // hero: Hero = { id: 1, name: 'Windstorm' };
  heroes = HEROES;

  onSelect(hero: Hero): void {
    console.log(`selected`);
    this.selectedHero = hero;
  }
  selectedHero?: Hero;

}
