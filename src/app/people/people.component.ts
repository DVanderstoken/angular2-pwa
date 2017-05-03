import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {

  people = [];
  private _page = 1;
  loading: boolean;
  selectedPeople;

  constructor(private _http: Http,
              private router: Router) {
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

  ngOnDestroy() {
  }

  getPeople(page: number = 1): Observable<any> {
    return this._http.get('https://swapi.co/api/people/?page=' + page)
      .map((result: Response) => result.json()['results'])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  onSelect(perso) {
      console.log(perso);
  }
}
