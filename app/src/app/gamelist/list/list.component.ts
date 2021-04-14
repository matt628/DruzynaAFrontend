import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/objects/gameInterface';
import { DatabaseGamesService } from 'src/app/services/database-games.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dbService: DatabaseGamesService) { }
  gameList: Game[];
  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
   this.dbService.getGameList().subscribe((response) => {
     console.log(response);
     this.gameList = response;

   })
  }

}
