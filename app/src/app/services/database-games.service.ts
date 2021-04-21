import { Injectable } from '@angular/core';
import { Game } from '../objects/gameInterface';
import { GAMELIST } from '../objects/gameList';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { QUEUELIST } from '../objects/queueList';
import { Queue } from '../objects/queueInterface';

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseGamesService {
  URL = 'https://botcompetitionarena.herokuapp.com/games';
  gameCollection: Game[] = GAMELIST
  queueCollectionForGame1: Queue[] = QUEUELIST;

  

  constructor(private http: HttpClient) { }
  getGameList() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

   
    return this.http.get<Game[]>(this.URL, httpOptions);
  }

  getQueueByGameId(gameID){
    // TODO: implement
    return this.queueCollectionForGame1;
  }
  

}
