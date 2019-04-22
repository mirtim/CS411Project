import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: 'map', component: MapComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
