import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  message: string[] = [];

  add(message: string) {
    this.message.push(message);
    setTimeout(() => this.message = [], 5000);
  }

  /*clear() {
    this.message = [];
  }*/
}
