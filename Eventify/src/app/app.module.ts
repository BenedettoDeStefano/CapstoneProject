import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { Route, RouterModule } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LocationSelectionComponent } from './Components/location-selection/location-selection.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { EventDetailComponent } from './Components/event-detail/event-detail.component';
import { CategoriesTabComponent } from './Components/categories-tab/categories-tab.component';
import { UserProfileTabComponent } from './Components/user-profile-tab/user-profile-tab.component';
import { ReservationTabComponent } from './Components/reservation-tab/reservation-tab.component';
import { ReviewComponent } from './Components/review/review.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { TokenInterceptor } from './Auth/token.interceptor';

const rotte: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'select-location',
    component: LocationSelectionComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  { path: 'event/:id',
    component: EventDetailComponent
  },
  {
    path: 'categories',
    component: CategoriesTabComponent
  },
  {
    path: 'profile',
    component: UserProfileTabComponent
  },
  {
    path: 'reservations',
    component: ReservationTabComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavBarComponent,
    LocationSelectionComponent,
    HomePageComponent,
    EventDetailComponent,
    CategoriesTabComponent,
    UserProfileTabComponent,
    ReservationTabComponent,
    ReviewComponent,
    NotificationComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotte),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
