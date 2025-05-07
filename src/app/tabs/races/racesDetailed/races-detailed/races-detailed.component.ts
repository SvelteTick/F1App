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
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-races-detailed',
  templateUrl: './races-detailed.component.html',
  styleUrls: ['./races-detailed.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardContent,
    IonCardSubtitle,
    IonCol,
    IonRow,
    IonCard,
    IonCardHeader,
    IonGrid,
    IonSegmentButton,
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
  raceId: number | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.raceId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Race ID:', this.raceId); 
  }

  
}
