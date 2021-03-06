import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { CreateComponent } from './create';
import { AuthService } from './auth';
import { AuthComponent } from './auth/index';
import { MissingPageComponent } from './missing-page';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: ':lang',      component: HomeComponent },
  { path: 'home/:lang',  component: HomeComponent },
  { path: 'question/:q/:lang',  component: HomeComponent },
  { path: 'state',    component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'create', component: CreateComponent },
  { path: 'auth', component: AuthComponent},
  // {
 //   path: 'create', loadChildren: () => System.import('./create') // Loads asynchronously
 //     .then((comp: any) => comp.default)
 // }, TODO path: 'create', component: CreateComponent , canActivate: [AuthService]
  { path: '**',    component: MissingPageComponent },
];
