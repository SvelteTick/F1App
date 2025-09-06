import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

export class YourPageComponent {
  constructor(private platform: Platform, private location: Location) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }
}