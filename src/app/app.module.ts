import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { UIService } from './shared/ui-service';

import { TrainingService } from './training/training.service';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {StoreModule} from '@ngrx/store'

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './training/welcome/welcome.component'
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AuthService } from './auth/auth.service';

import {reducers} from './app.reducer'

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AuthModule,
    StoreModule.forRoot(reducers)
    
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
