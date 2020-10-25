//import 'zone.js';
//import 'zone.js/dist/long-stack-trace-zone.js';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Firebase components
import { FirebaseService } from './services/firebase.service';
import { FirebaseDBService } from './services/firebase-db.service';
import { FirebaseFileService } from './services/firebase-file.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Page Components
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GettingStartedPageComponent } from './pages/getting-started-page/getting-started-page.component';
import { CandidatePageComponent } from './pages/candidate-page/candidate-page.component';
import { WorkTrackerPageComponent } from './pages/work-tracker-page/work-tracker-page.component';

// PrimeNG components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

//material components
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GettingStartedPageComponent,
    CandidatePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    HttpClientModule,
    MatSliderModule,
    MatMenuModule,
    AgGridModule.withComponents([])
  ],
  providers: [ AngularFireAuth, 
               AngularFirestore, 
               FirebaseService, 
               FirebaseDBService, 
               FirebaseFileService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
