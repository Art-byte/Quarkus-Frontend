import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  message : string[] = [];

  addMessage(message: string){
    this.message.push(message);
  }

  clearMessages(){
    this.message = [];
  }
}
