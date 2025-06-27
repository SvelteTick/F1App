import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonCardHeader,
  IonChip,
  IonCard,
  IonRow,
} from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { IConstructorsStandings } from 'src/app/api/interfaces';

@Component({
  selector: 'app-constructors',
  templateUrl: './constructors.page.html',
  styleUrls: ['./constructors.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCard,
    IonChip,
    IonCardHeader,
    IonGrid,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ConstructorsPage implements OnInit {
  constructors_championship: IConstructorsStandings[] = [];

  constructor(private fOneApiService: FOneApiService) {}

  ngOnInit() {
    this.fOneApiService.fetchConstructorsStandings().subscribe({
      next: (response) => {
        console.log(response);
        this.constructors_championship =
          response.constructors_championship.sort(
            (a, b) => a.position - b.position
          );
      },
      error: (err) => {
        console.error('Failed to fetch constructors standings:', err);
      },
    });
  }
}
