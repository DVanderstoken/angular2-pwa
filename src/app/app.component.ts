import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  people = [];
  private _page = 1;
  loading: boolean;

  constructor(private _http: Http) {

    if (window['updatefound']) {
      window.location.reload();
    }

  }

  ngOnInit() {
    this.loading = true;
    for (let indice = 0; indice < 9 ; indice++ ) {
      this.getPeople(indice + 1).subscribe(data => {
        this.people = this.people.concat(data);
      });
    }
    this.loading = false;
  }

  getPeople(page: number = 1): Observable<any> {
    return this._http.get('https://swapi.co/api/people/?page=' + page)
      .map((result: Response) => result.json()['results'])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
