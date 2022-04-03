import { Directive, ElementRef, HostListener } from '@angular/core';
import { HeroService } from './hero.service';

@Directive({
  selector: '[appPersistentStorageExport]'
})
export class PersistentStorageExportDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.setExport();
  }
  private setExport() {
    const prettifiedJson = JSON.stringify(JSON.parse(localStorage.getItem('heroes')!), null, 2);
    this.el.nativeElement.href = 'data:application/json;charset=utf-8,'+ encodeURIComponent(prettifiedJson);
    this.el.nativeElement.download = `data_${new Date().toLocaleString().replace(' ','_')}.json`;
  }

}
