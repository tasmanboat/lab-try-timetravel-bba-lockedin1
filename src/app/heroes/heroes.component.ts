import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  // hero = 'Windstorm';
  // hero: Hero = { id: 1, name: 'Windstorm' };
  // heroes = HEROES;
  heroes: Hero[] = [];

  onSelect(hero: Hero): void {
    // console.log(`selected`);
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  selectedHero?: Hero;

}
