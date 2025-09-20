import { Injectable } from '@angular/core';
import {
  DriversResponse,
  IConstructorsStandingsApiResponse,
  IDriverStandingsApiResponse,
  IRacesApiResponse,
} from './interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FOneApiService { 
  private _storageReady: Promise<void>;

  constructor(private http: HttpClient, private storage: Storage) {
    this._storageReady = this.init();
  }

  private async init() {
    (this.storage as any)._dbConfig = {
      name: '__mydb',
      storeName: 'keyvaluepairs',
      driverOrder: ['indexeddb', 'localstorage']
      
    };

     await this.storage.create();
  }

  private async ensureReady() {
    return this._storageReady;
  }

    async setValue(key: string, value: any) {
    await this.ensureReady();
    return this.storage.set(key, value);
  }

  async getValue(key: string) {
    await this.ensureReady();
    return this.storage.get(key);
  }

  async fetchRacesWithCache(): Promise<IRacesApiResponse[]> {
    await this.ensureReady();

    if (navigator.onLine) {
      const response = await firstValueFrom(
        this.http.get<any[]>(`${environment.apiURL}/current`)
      );
      await this.storage.set('racesData', response);
      return response;
    } else {
      return (await this.storage.get('racesData')) ?? [];
    }
  }

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

  async scheduleNextRaceNotification(races: any[]) {
    await this.ensureReady();

    const now = new Date();
    const nextRace = races.find(race => {
      const raceDate = new Date(race.schedule.race.date + 'T' + race.schedule.race.time + 'Z');
      return raceDate > now;
    });

    if (nextRace) {
      const raceDate = new Date(nextRace.schedule.race.date + 'T' + nextRace.schedule.race.time + 'Z');
      const notificationTime = new Date(raceDate);
      notificationTime.setDate(raceDate.getDate() - 1);

      const localTime = raceDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'F1 Race Reminder',
            body: `The next F1 race (${nextRace.raceName}) is tomorrow at ${localTime}!`,
            id: 1,
            schedule: { at: notificationTime },
          }
        ]
      });
    }
  }
}

