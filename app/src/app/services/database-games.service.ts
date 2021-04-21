import { Injectable } from '@angular/core';
import { Game } from '../objects/gameInterface';
import { GAMELIST } from '../objects/gameList';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, pipe } from 'rxjs';
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

  getGame(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const url = 'https://botcompetitionarena.herokuapp.com/game/' + id;

    // return this.http.get<Game>(url, httpOptions);

     return of({id: id, name: 'empty', currentBattleNumer: 1, totalBattleNumler: 1, shortDescription: 'description'})

  }

  getEmptyGame() {
    return {id: '-1', name: '', currentBattleNumer: -1, totalBattleNumler: -1, shortDescription: ''};
  }

  getQueueByGameId(gameID){
    // TODO: do innego serwisu
    return this.queueCollectionForGame1;
  }
  

}
