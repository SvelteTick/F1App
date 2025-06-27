import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'races',
        loadComponent: () =>
          import('./races/races.page').then((m) => m.RacesPage),
      },
      // {
      //   path: 'drivers',
      //   loadComponent: () =>
      //     import('./drivers/drivers.page').then((m) => m.DriversPage),
      // },
      // // {
      // //   path: 'constructors',
      // //   loadComponent: () =>
      // //     import('./constructors/constructors.page').then((m) => m.ConstructorsPage),
      // // },
      // {
      //   path: 'races/racesDetailed',
      //   loadComponent: () =>
      //     import('./races/racesDetailed/races-detailed/races-detailed.component').then(
      //       (m) => m.RacesDetailedComponent
      //     ),
      // },
      {
        path: '',
        redirectTo: '/tabs/races',
        pathMatch: 'full',
      },

    ],
  },

];
