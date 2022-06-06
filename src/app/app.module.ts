import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NgSelect2Module } from 'ng-select2';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './landing/navbar/navbar.component';
import { MainComponent } from './landing/main/main.component';
import { LoginComponent } from './login/login.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './page/admin/admin.component';
import { EmpresasComponent } from './page/admin/content/empresas/empresas.component';
import { NavbarAdminComponent } from './page/admin/content/navbar-admin/navbar-admin.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MainDashboardComponent } from './page/dashboard/content/main-dashboard/main-dashboard.component';
import { VerificateComponent } from './verificate/verificate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileComponent } from './page/dashboard/content/profile/profile.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { UsersComponent } from './page/dashboard/content/administration/users/users.component';
import { VentasComponent } from './page/dashboard/content/ventas/ventas.component';
import { ComprasComponent } from './page/dashboard/content/compras/compras.component';
import { InformesComponent } from './page/dashboard/content/contaduria/informes/informes.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    EmpresasComponent,
    NavbarAdminComponent,
    DashboardComponent,
    MainDashboardComponent,
    VerificateComponent,
    ProfileComponent,
    UsersComponent,
    VentasComponent,
    ComprasComponent,
    InformesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelect2Module,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule  
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,
    { provide: PERSISTENCE, useValue: 'session' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
