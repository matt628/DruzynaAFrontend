import { Injectable } from '@angular/core';
import { Game } from '../objects/gameInterface';
import { GAMELIST } from '../objects/gameList';


@Injectable({
  providedIn: 'root'
})
export class DatabaseGamesService {
  URL = 'https://botcompetitionarena.herokuapp.com/';
  gameCollection: Game[] = GAMELIST
  constructor() { }
  getGameList() {
    return this.gameCollection;
  }

}
