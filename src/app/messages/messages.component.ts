import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.messageService.add(`test 4000`)
      // this.cdr.markForCheck()
    }, 4000)
  }

}
