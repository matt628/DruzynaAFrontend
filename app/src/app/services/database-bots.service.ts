import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bot } from '../objects/botInterface';
import { BOTLIST } from '../objects/botList';

@Injectable({
  providedIn: 'root'
})
export class DatabaseBotsService {
  botsCollection: Bot[] = BOTLIST;
  SERVER_URL: string = "https://botcompetitionarena.herokuapp.com/upload-bot";

  constructor(private httpClient: HttpClient) { }
  getBotList(context) {
    return this.botsCollection; //It will be much more sophisticated, promise
  }

  addBotToDatabase(bot: Bot, zip: File) {
    // if (photo == null) {
      
    // }
     // todo refactor when backend ready
    const backendBot = {
      name: bot.name,
      version: bot.version,
      payload: zip
    }
    return this.httpClient.post<any>(this.SERVER_URL, bot, {
      reportProgress: true,
  
      observe: 'events'
  
    });
    // TODO
  }

}
