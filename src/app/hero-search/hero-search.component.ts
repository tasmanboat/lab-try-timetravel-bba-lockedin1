import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

/*
消费者 heroes
被消费者 searchTerms
*/
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  private searchTerms = new Subject<string>();
  heroes$: Observable<Hero[]> = this.searchTerms.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((term: string) => this.heroService.searchHeroes(term.trim())),
  )

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
