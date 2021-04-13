import { Injectable } from '@angular/core';
import { Bot } from '../objects/botInterface';
import { BOTLIST } from '../objects/botList';

@Injectable({
  providedIn: 'root'
})
export class DatabaseBotsService {
  botsCollection: Bot[] = BOTLIST;
  constructor() { }
  getBotList(context) {
    return this.botsCollection; //It will be much more sophisticated, promise
  }

  addBotToDatabase(bot: Bot, photo: File) {
    if (photo != null) {
      
    }
    // TODO
  }
}
