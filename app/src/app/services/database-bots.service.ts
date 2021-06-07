import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
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
  BOTS_URL = "https://botcompetitionarena.herokuapp.com/queues/"

  constructor(private httpClient: HttpClient, private router: Router) { }
  getBotList(queueId) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.httpClient.get<{id, name, deadline, bots: {id, place, log, bot: Bot}[]}>(this.BOTS_URL+queueId, httpOptions);
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
      queue: bot.queueId,
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
      window.alert("upload successful")
      this.router.navigate(['queue/', bot.queueId])

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
      window.alert("Dodano bota pomyślnie")
      this.router.navigate(['/queue', bot.queueId])

    }, (err: HttpErrorResponse) => {
      window.alert("Sorry there must be some problems with server. Try again later\n" + err)

    } );

    // console.log(postRetrun)

    return postRetrun
    // TODO
  }

}
