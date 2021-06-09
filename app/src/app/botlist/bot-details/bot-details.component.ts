import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bot-details',
  templateUrl: './bot-details.component.html',
  styleUrls: ['./bot-details.component.css']
})
export class BotDetailsComponent implements OnInit {
  id: string;
  queueId: string;
  URL_make_run = 'https://botcompetitionarena.herokuapp.com/bot-test'
  results: Observable<any>
  working = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.queueId = params.get('qid')
    })
    // switchMap() use to change observable type // todo after connection with backend

  }


  ngOnInit(): void {
    this.askBackedIfBotrRun()
  }

  askBackedIfBotrRun() {
    console.log("Asking about bot" + this.queueId + this.id)
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    var formData = new FormData();
    formData.append('queueId', this.queueId)
    formData.append('botId', this.id)


    this.http.post<any>(this.URL_make_run, formData, httpOptions ).subscribe(response =>{
      console.log("Response for: " + 'qid:' + this.queueId + 'bot_id:' + this.id)
      console.log(response)
    }, 
    err => {
      console.log("Dont worry")
      console.log(err)
      this.working = false
      console.log(err.error.text);
      window.alert(err.error.text);

    })

  }

}
