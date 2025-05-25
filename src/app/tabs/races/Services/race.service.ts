import { Injectable } from '@angular/core';
import { IRaces } from 'src/app/api/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  race: IRaces | null = null;

  constructor() { }

  getRace() {
    return this.race
  }

  setRace(race: IRaces) {
    this.race = race
  }
 


}
