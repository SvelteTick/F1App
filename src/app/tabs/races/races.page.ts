import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
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
  IonBadge,
  IonChip,
  IonHeader,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { FOneApiService } from 'src/app/api/fone-api.service';
import { IRaces } from 'src/app/api/interfaces';
import { addIcons } from 'ionicons';
import { chevronForwardSharp, notificationsOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { RaceService } from './Services/race.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonHeader,
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
  ],
})
export class RacesPage implements OnInit {
  isOnline = true;
  races: IRaces[] = [];
  nextRaceIndex: number = 0;

  @ViewChildren('raceCard', { read: ElementRef })
  raceCards!: QueryList<ElementRef>;

  constructor(
    private fOneApiService: FOneApiService,
    private raceService: RaceService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    addIcons({ chevronForwardSharp, notificationsOutline });
  }
  ngOnInit() {
    this.isOnline = navigator.onLine;
    window.addEventListener('online', () => (this.isOnline = true));
    window.addEventListener('offline', () => (this.isOnline = false));

    if (this.isOnline) {
      this.fOneApiService.fetchRaces().subscribe({
        next: (response) => {
          console.log(response);
          this.races = response.races;
          this.nextRaceIndex = this.races.findIndex((race) => {
            const raceDate = new Date(
              race.schedule.race.date + 'T' + race.schedule.race.time
            );
            return raceDate > new Date();
          });
        },
        error: (err) => {
          console.error('Failed to fetch races:', err);
        },
      });
      console.log(this.races);
    }
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
        cards[this.nextRaceIndex].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  }

  setRaceAndNavigate(race: IRaces) {
    this.raceService.setRace(race);
    this.router.navigate(['/tabs/races/racesDetailed']);
  }

  async sendTestNotification() {
    await this.notificationService.showNotification(
      1,
      'F1 Race Alert',
      'Test notification from F1 App!'
    );
  }
}

export class RacesPageModule {}
