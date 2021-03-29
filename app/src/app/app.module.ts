import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './gamelist/list/list.component';
import { ListItemComponent } from './gamelist/list-item/list-item.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { MainPageComponent } from './utils/main-page/main-page.component';
import { GameDetailsComponent } from './gameList/game-details/game-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {path: 'main', component: MainPageComponent},
  {path: 'games-list', component: ListComponent},
  {path: '**', component: PageNotFoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    ListItemComponent,
    PageNotFoundComponent,
    MainPageComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
