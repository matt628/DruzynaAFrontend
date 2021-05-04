import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bot } from '../objects/botInterface';
import { BOTLIST } from '../objects/botList';

@Injectable({
  providedIn: 'root'
})
export class DatabaseBotsService {
  botsCollection: Bot[] = BOTLIST;
  SERVER_URL: string = "https://botcompetitionarena.herokuapp.com/upload-bot";

  constructor(private httpClient: HttpClient, private router: Router) { }
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

  addBotToDatabase(bot: Bot) {
    // if (photo == null) {
      
    // }
     // todo refactor when backend ready
    const backendBot = {
      name: bot.name,
      version: bot.version,
      queueId: bot.queueId,
      payload: bot.zip
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
      // switch (res.type) {
      //   case HttpEventType.Sent:
      //     console.log('Request has been made!');
      //     break;
      //   case HttpEventType.ResponseHeader:
      //     console.log('Response header has been received!');
      //     break;
      //   case HttpEventType.Response:
      //     console.log('Bot successfully created!', res.body);
      //     alert("Bot successfully added!")
      // }
      // this.router.navigate(['/queue', bot.queueId])

    });

    // console.log(postRetrun)

    return postRetrun
    // TODO
  }

}
