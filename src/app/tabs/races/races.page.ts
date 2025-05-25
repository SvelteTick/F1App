import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardTitle, IonSegmentButton, IonGrid, IonCardHeader, IonCard, IonRow, IonCol, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { IRacesApiResponse, IRaces } from 'src/app/api/interfaces';
import { addIcons } from 'ionicons';
import { chevronForwardSharp} from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { RaceService } from './Services/race.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
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
  ]
  
})

export class RacesPage implements OnInit {
  races: IRaces[] = [];

  
  constructor(private fOneApiService: FOneApiService, private raceService: RaceService, private router: Router) {
  addIcons({chevronForwardSharp});
  
  }
  ngOnInit() {
    this.fOneApiService.fetchRaces().subscribe({
      next: (response) => {

        console.log(response)
        this.races = response.races;
      },
      error: (err) => {
        console.error('Failed to fetch races:', err);
      },
    });
    console.log(this.races)
  }

  setRaceAndNavigate(race: IRaces) {
    this.raceService.setRace(race)
    this.router.navigate(["/tabs/races/racesDetailed"])
  }


  }

  export class RacesPageModule {}

  