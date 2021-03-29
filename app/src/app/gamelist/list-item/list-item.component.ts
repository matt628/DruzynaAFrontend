import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/objects/gameInterface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor() { }
  game: Game;
  ngOnInit(): void {
  }

}
