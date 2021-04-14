import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import { requiredFileType } from '../new-game/new-game.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  model: NgbDateStruct;
  progress = 0;
  id: Observable<string>;
  staticId: string = '';

  uploadGame = new FormGroup({
    name: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
    config: new FormControl(null, [Validators.required, requiredFileType('py')])
  });
  success = false;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.paramMap.pipe(
      switchMap((params) => {
        this.staticId = params.get('id');
        return params.get('id')}), catchError(err => of(""))
    )
  }

  submit() {
    this.success = false;
    if ( !this.uploadGame.valid ) {
      markAllAsDirty(this.uploadGame);
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    this.http.post('https://botcompetitionarena.herokuapp.com/start-game', toFormData(this.uploadGame.value, this.staticId), httpOptions).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody()
    ).subscribe(res => {
      this.progress = 0;
      this.success = true;
      this.uploadGame.reset();
    });

  }

  hasError( field: string, error: string ) {
    const control = this.uploadGame.get(field);
    return control.dirty && control.hasError(error);
  }  

}
export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>( formValue: T , id: string) {
  const formData = new FormData();

  formData.append("gameId", id)
  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    if (key === 'deadline') {
     const date: NgbDateStruct = formValue[key];
     formData.append(key, new Date(date.year.toString() + "-" + date.month.toString() + "-" + date.day.toString()).toISOString())
    } else {
      formData.append(key, value);

    }
  }

  return formData;
}

