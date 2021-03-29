import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/objects/gameInterface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }
  gameList: Game[];
  ngOnInit(): void {
  }

}
