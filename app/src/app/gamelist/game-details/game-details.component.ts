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
  game: Observable<Game>;
  name: string
  description: string
  gameId: string;

  constructor(private route: ActivatedRoute, private gameService: DatabaseGamesService) { }

  ngOnInit(): void {

    this.gameId = this.route.snapshot.url[1].path
    this.game = this.gameService.getGame(this.gameId)
    this.game.subscribe(q => {
      this.name = q.name
      this.description = q.shortDescription
    })
        // switchMap() use to change observable type // todo after connection with backend
  }

}
