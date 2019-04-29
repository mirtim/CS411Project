import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatExpansionModule,
  MatStepperModule, MatProgressSpinnerModule, MatRadioModule
} from '@angular/material';
import { MapComponent } from './map/map.component';
import { AgmDirectionModule} from 'agm-direction';
import { AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider  } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateComponent } from './create/create.component';

import { API_KEYS } from "./environment";


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderbarComponent,
    MapComponent,
    LoginComponent,
    ProfileComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AgmDirectionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    SocialLoginModule,
    MatMenuModule,
    HttpClientModule,
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
