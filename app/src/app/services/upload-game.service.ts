import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadGameService {

  SERVER_URL: string = "https://botcompetitionarena.herokuapp.com/upload-game";
  constructor(private httpClient: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, this.httpOptions
    //    {
    //   reportProgress: true,
    //   observe: 'events'
    // }
    ).subscribe(res => {
      console.log(res)
      window.alert("upload successful")
      this.router.navigate(['/games-list'])
    }, (err: HttpErrorResponse) => {
      window.alert("Sorry there must be some problems with server. Try again later\n" + err.message + err.status )

    });;


  }

}
