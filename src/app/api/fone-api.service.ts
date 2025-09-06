import { Injectable } from '@angular/core';
import {
  DriversResponse,
  IConstructorsStandingsApiResponse,
  IDriverStandingsApiResponse,
  IRacesApiResponse,
} from './interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FOneApiService {
  constructor(private http: HttpClient) {}

  fetchDrivers(): Observable<DriversResponse> {
    return this.http.get<DriversResponse>(
      `${environment.apiURL}/current/drivers`
    );
  }

  fetchRaces(): Observable<IRacesApiResponse> {
    return this.http.get<IRacesApiResponse>(`${environment.apiURL}/current`);
  }

  fetchDriverStandings(): Observable<IDriverStandingsApiResponse> {
    return this.http.get<IDriverStandingsApiResponse>(
      `${environment.apiURL}/current/drivers-championship`
    );
  }
  fetchConstructorsStandings(): Observable<IConstructorsStandingsApiResponse> {
    return this.http.get<IConstructorsStandingsApiResponse>(
      `${environment.apiURL}/current/constructors-championship`
    );
  }
}


