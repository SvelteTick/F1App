import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  async checkPermissions(): Promise<boolean> {
    const permStatus = await LocalNotifications.checkPermissions();
    return permStatus.display === 'granted';
  }

  async requestPermissions(): Promise<boolean> {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  }

  async ensurePermissions(): Promise<boolean> {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      return await this.requestPermissions();
    }
    return true;
  }

  async showNotification(
    id: number,
    title: string,
    body: string
  ): Promise<void> {
    const hasPermission = await this.ensurePermissions();
    if (!hasPermission) {
      console.log('Notification permissions not granted');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
        },
      ],
    });
  }

  async scheduleNotification(
    id: number,
    title: string,
    body: string,
    scheduleAt: Date
  ): Promise<void> {
    const hasPermission = await this.ensurePermissions();
    if (!hasPermission) {
      console.log('Notification permissions not granted');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          schedule: { at: scheduleAt },
        },
      ],
    });
  }

  async scheduleRecurringNotification(
    id: number,
    title: string,
    body: string,
    hour: number,
    minute: number = 0
  ): Promise<void> {
    const hasPermission = await this.ensurePermissions();
    if (!hasPermission) {
      console.log('Notification permissions not granted');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          schedule: {
            on: {
              hour,
              minute,
            },
            every: 'day',
          },
        },
      ],
    });
  }

  async cancelNotification(id: number): Promise<void> {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }

  async cancelAllNotifications(): Promise<void> {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending);
    }
  }

  async getPendingNotifications() {
    return await LocalNotifications.getPending();
  }

  async scheduleNextRaceNotification(
    raceName: string,
    raceDate: Date
  ): Promise<void> {
    const notificationId = 999; // Fixed ID for next race notification

    // Cancel existing next race notification first
    await this.cancelNotification(notificationId);

    // Schedule 1 day before race
    const notificationDate = raceDate;
    notificationDate.setDate(notificationDate.getDate() - 1);
    notificationDate.setHours(9, 0, 0, 0); // 9 AM the day before

    // Only schedule if the notification date is in the future
    if (notificationDate > new Date()) {
      await this.scheduleNotification(
        notificationId,
        'F1 Race Tomorrow!',
        `${raceName} starts tomorrow at ${raceDate}`,
        notificationDate
      );
    }
  }
}
