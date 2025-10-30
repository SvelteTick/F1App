import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NotificationService } from './services/notification.service';
import { FOneApiService } from './api/fone-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private notificationService: NotificationService,
    private apiService: FOneApiService
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.notificationService.ensurePermissions();
    await this.scheduleNextRaceReminder();
    // await this.testNotification();
  }

  private async testNotification() {
    try {
      const response = await this.apiService.fetchRacesWithCache();
      if (!response || !response.races || response.races.length === 0) return;

      const now = new Date();

      // Find next upcoming race
      for (const race of response.races) {
        const raceDate = new Date(
          `${race.schedule.race.date}T${race.schedule.race.time || '00:00:00'}`
        );

        if (raceDate > now) {
          console.log('Sending test notification for:', race.raceName);

          await this.notificationService.showNotification(
            998,
            'F1 Race Tomorrow!',
            `${race.raceName || 'Grand Prix'} starts tomorrow`
          );
          return;
        }
      }
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  }

  private async scheduleNextRaceReminder() {
    try {
      const response = await this.apiService.fetchRacesWithCache();
      if (!response || !response.races || response.races.length === 0) return;

      const now = new Date();

      // Find next upcoming race
      for (const race of response.races) {
        const raceDate = new Date(
          `${race.schedule.race.date}T${race.schedule.race.time || '00:00:00'}`
        );

        if (raceDate > now) {
          const notificationDate = new Date(raceDate);
          notificationDate.setDate(notificationDate.getDate() - 1);
          notificationDate.setHours(9, 0, 0, 0);

          console.log('Next race:', race.raceName, 'on', raceDate);
          console.log('Notification scheduled for:', notificationDate);

          await this.notificationService.scheduleNextRaceNotification(
            race.raceName || 'Grand Prix',
            raceDate
          );
          return; // Exit after scheduling first upcoming race
        }
      }
    } catch (error) {
      console.error('Failed to schedule race notification:', error);
    }
  }
}

export class YourPageComponent {
  constructor(private platform: Platform, private location: Location) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }
}
