import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    this.log(`HeroService: fetched heroes`);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.filter(h => h.id === id).pop()!;
    const url = `${this.heroesUrl}/${id}`;
    this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(url).pipe(
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(error => { return throwError(() => new Error(error))})
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesUrl = 'api/heroes';
}
