import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { MissingPageComponent } from './missing-page';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'create', loadChildren: () => System.import('./create') // Loads asynchronously
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: MissingPageComponent },
];
