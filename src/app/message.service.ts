import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    // this.messages.push(message)
    this.messages = [...this.messages, message]
  }

  clear() {
    this.messages = []
  }

  constructor() { }
}
