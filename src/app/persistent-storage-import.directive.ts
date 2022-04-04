import { Directive, ElementRef, HostListener } from '@angular/core';
import { Hero } from './hero';

@Directive({
  selector: '[appPersistentStorageImport]'
})
export class PersistentStorageImportDirective {
  // @ContentChild('importFile') importFile?: ElementRef;
  // @ContentChild('importButton') importButton?: ElementRef;

  constructor(private el: ElementRef) { }

  /*
  @HostListener('click', ['$event']) onClick(e: any) {
    // this.setImport();
    // console.log(e);
    if (e.import) {
      e.stopPropagation();
      e.preventDefault();
      console.log(`ready to import`)
    }
  }
  */

  @HostListener('change') onChange() {
    this.setImport();
    // console.log(`ready to import`)
  }
  setImport(): void {
    try {
      const files = this.el.nativeElement?.files;
      // const files = $event.target.files[0];
      if (files.length <= 0) { return; }
      const file: File = files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        // console.log(fileReader.result)
        // console.log(typeof fileReader.result) // string
        const heroes: Hero[] = JSON.parse(fileReader.result as string);
        this.setLocalStorageHeroes(heroes);
        window.location.reload();
      }
      if (file) { fileReader.readAsText(file) }
    } catch (err) {
      console.error(err);
    }
  }
  setLocalStorageHeroes(heroes: Hero[]): void {
    localStorage.setItem('heroes', JSON.stringify(heroes))
  }

  resetLocalStorageHeroes(): void {
    localStorage.removeItem('heroes');
    // localStorage.clear();
  }
}
