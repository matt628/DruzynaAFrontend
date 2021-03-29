import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  id: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.paramMap.pipe(
       switchMap((params) => params.get('id')) //todo: gets last id char
    )
    // switchMap() use to change observable type // todo after connection with backend
  }

}
