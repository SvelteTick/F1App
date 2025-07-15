import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonChip,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { Driver, IDriverStandings } from 'src/app/api/interfaces';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonChip,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DriversPage implements OnInit {
  drivers: Driver[] = [];
  drivers_championship: IDriverStandings[] = [];

  constructor(private fOneApiService: FOneApiService) {}

  ngOnInit() {
    this.fOneApiService.fetchDrivers().subscribe({
      next: (response) => {
        this.drivers = response.drivers.sort((a, b) => a.number - b.number);
      },
      error: (err) => {
        console.error('Failed to fetch drivers:', err);
      },
    });
    this.fOneApiService.fetchDriverStandings().subscribe({
      next: (response) => {
        console.log(response);
        this.drivers_championship = response.drivers_championship.sort(
          (a, b) => a.position - b.position
        );
      },
      error: (err) => {
        console.error('Failed to fetch driver standings:', err);
      },
    });
  }
}
