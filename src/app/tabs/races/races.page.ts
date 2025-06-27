import { Component, OnInit, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonToolbar, IonCardTitle, IonSegmentButton, IonGrid, IonCardHeader, IonCard, IonRow, IonCol, IonCardSubtitle, IonCardContent, IonIcon, IonBadge, IonChip } from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { IRaces } from 'src/app/api/interfaces';
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
    IonChip,
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
  nextRaceIndex: number = 0;

   @ViewChildren('raceCard', { read: ElementRef }) raceCards!: QueryList<ElementRef>;

  constructor(private fOneApiService: FOneApiService, private raceService: RaceService, private router: Router) {
    addIcons({ chevronForwardSharp });
  }
  ngOnInit() {
    this.fOneApiService.fetchRaces().subscribe({
      next: (response) => {

        console.log(response)
        this.races = response.races;
        this.nextRaceIndex = this.races.findIndex(race => {
        const raceDate = new Date(race.schedule.race.date + 'T' + race.schedule.race.time);
        return raceDate > new Date();
        });
        
      },
      error: (err) => {
        console.error('Failed to fetch races:', err);
      },
    });
    console.log(this.races)
  }

  ngAfterViewInit() {
  this.raceCards.changes.subscribe(() => {
    this.scrollToNextRace();
  });
  this.scrollToNextRace();
}

scrollToNextRace() {
  setTimeout(() => {
    const cards = this.raceCards.toArray();
    if (cards && cards[this.nextRaceIndex]) {
      cards[this.nextRaceIndex].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}


  setRaceAndNavigate(race: IRaces) {
    this.raceService.setRace(race)
    this.router.navigate(["/tabs/races/racesDetailed"])
  }


  }

  export class RacesPageModule {}

