import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonLabel, IonSegmentButton, IonSegment, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { races, RacesResponse } from 'src/app/api/interfaces';
import { addIcons } from 'ionicons';
import { chevronForwardSharp } from 'ionicons/icons'



@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class RacesPage implements OnInit {
  races: races[] = [];

  constructor(private fOneApiService: FOneApiService) {
      addIcons({chevronForwardSharp});}

  ngOnInit() {
    this.fOneApiService.fetchRaces().subscribe({
      next: (response) => {
        this.races = response.races;
      },
      error: (err) => {
        console.error('Failed to fetch races:', err);
      },
    });
  }

}

addIcons({
  'chevron-forward-sharp': chevronForwardSharp,
});