import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  formData(formValue){
    const formData = new FormData();
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData
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
    console.log(backendBot)

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    
    var postRetrun = this.httpClient.post<any>(this.SERVER_URL, this.formData(backendBot), httpOptions).subscribe(res =>{
      console.log(res)
    });

    // console.log(postRetrun)

    return postRetrun
    // TODO
  }

}
