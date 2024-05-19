import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { CityComponent } from './components/city/city.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StateComponent } from './components/state/state.component';
import { PaginationComponent } from './components/pagination/pagination.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'city/:id', component: CityComponent },
  { path: 'state/:name', component: StateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pages', component: PaginationComponent },
  { path: '**', component: NotFoundComponent },
];

// export const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
//   { path: 'pokemon', component: PokeListComponent },
//   { path: 'pokemon/:pokeId', component: PokeDetailComponent },
//   { path: 'pokemon/search/:name', component: PokeDetailComponent },
// ];
