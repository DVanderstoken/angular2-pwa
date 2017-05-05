import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class PeopleService {

    constructor(private _http: Http) {
    }

    getPeople(page: number = 1): Observable<any> {
        return this._http.get('https://swapi.co/api/people/?page=' + page)
            .map((result: Response) => result.json()['results'])
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
