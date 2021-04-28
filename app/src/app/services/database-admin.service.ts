import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAdminService {
  logURL = 'https://dashboard.heroku.com/apps/botcompetitionarena/logs'

  constructor(private http: HttpClient) { }

  getHerokuLogs() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.get(this.logURL, httpOptions);
  }
}

