import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardTitle,
  IonSegmentButton,
  IonGrid,
  IonCardHeader,
  IonCard,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonCardContent,
  IonIcon, IonChip } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../../Services/race.service';
import { IRaces } from 'src/app/api/interfaces';

@Component({
  selector: 'app-races-detailed',
  templateUrl: './races-detailed.component.html',
  styleUrls: ['./races-detailed.component.scss'],
  standalone: true,
  imports: [IonChip, 
    IonHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCol,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
  
export class RacesDetailedComponent  implements OnInit {
  race: IRaces | null = null;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.race = this.raceService.getRace()
    console.log(this.race)
  }

  
}
