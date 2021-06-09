import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { requiredFileType } from '../new-game/new-game.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { QueueConfigHelpComponent } from '../../static/queue-config-help/queue-config-help.component';
import { MatDialog } from '@angular/material/dialog';

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
  } );
  success = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder,
    private router: Router) {
    this.minDate =  new Date(new Date().getTime())
    this.route.paramMap.subscribe( params => {
      this.staticId = params.get('id');
    }
        
    )
   }

  myForm: FormGroup
  minDate: Date
  
  minDatechecker(){

  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      config: ''
    } )



  }

  submit() {
    this.success = false;

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    this.http.post('https://botcompetitionarena.herokuapp.com/start-game', toFormData(this.uploadGame.value, this.staticId), httpOptions).subscribe(res => {
      console.log(res)
      this.progress = 0;
      this.success = true;
      this.uploadGame.reset();
      delay(200)
      window.alert("upload successful")
      this.router.navigate(['game/', this.staticId])
    }, (err: HttpErrorResponse) => {
      window.alert("Sorry there must be some problems with server. Try again later\n" + err)

    });

  }

  hasError( field: string, error: string ) {
    const control = this.uploadGame.get(field);
    return control.dirty && control.hasError(error);
  }  

  showHelp() {
    const dialogRef = this.dialog.open(QueueConfigHelpComponent);
  }

}
export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}
export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


export function toFormData<T>( formValue: T , id: string) {
  const formData = new FormData();

 
  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    if (key === 'deadline') {
     const date: NgbDateStruct = formValue[key];
     formData.append(key, new Date(date.year.toString() + "-" + date.month.toString() + "-" + date.day.toString()).toISOString())
    } else {
      formData.append(key, value);

    }
  }
  console.log(id)
  formData.append("gameId", id)
  for(var key in formData) {
    console.log(key);
}
  return formData;
}

