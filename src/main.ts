import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

export const appConfig = {
  providers: 
  [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations()
  ]
};

bootstrapApplication(
  AppComponent,
  appConfig
)
.catch( error => console.error(error) );
