import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:cityId', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent },
];

// export const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
//   { path: 'pokemon', component: PokeListComponent },
//   { path: 'pokemon/:pokeId', component: PokeDetailComponent },
//   { path: 'pokemon/search/:name', component: PokeDetailComponent },
// ];
