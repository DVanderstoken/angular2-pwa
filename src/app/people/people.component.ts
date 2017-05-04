import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [PeopleService]
})
export class PeopleComponent implements OnInit, OnDestroy {

  people = [];
  private _page = 1;
  loading: boolean;
  selectedPeople;

  constructor(private _peopleService: PeopleService) {
  }

  ngOnInit() {
    this.loading = true;
    for (let indice = 0; indice < 9 ; indice++ ) {
      this._peopleService.getPeople(indice + 1).subscribe(data => {
        this.people = this.people.concat(data);
      });
    }
    this.loading = false;
  }

  ngOnDestroy() {
  }

  onSelect(perso) {
      console.log(perso);
  }
}
