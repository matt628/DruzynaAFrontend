import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Game } from 'src/app/objects/gameInterface';
import { DatabaseGamesService } from '../../services/database-games.service';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  id: Observable<string>;
  game: Observable<Game>;
  name;

  constructor(private route: ActivatedRoute, private gameService: DatabaseGamesService) { }

  ngOnInit(): void {
    this.id = this.route.paramMap.pipe(
      switchMap((params) => params.get('id')
      ), catchError(err => of("")) //todo: gets last id char
    )
    this.game = this.route.paramMap.pipe(
      switchMap((params) => this.gameService.getGame(params.get('id'))
      ), catchError(err => of(this.gameService.getEmptyGame())) //todo: gets last id char
    )
    // switchMap() use to change observable type // todo after connection with backend
  }

}
