import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/objects/gameInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(private auth: AuthService) { }
  @Input()  game: Game;
  ngOnInit(): void {
  }

  isUserAdmin() {
    return this.auth.isAdmin()
  }

}
