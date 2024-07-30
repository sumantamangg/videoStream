import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { VideoLibraryComponent } from './pages/video-library/video-library.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './services/AuthGuard';
import { StoreModule } from '@ngrx/store';
import { VideoUploadComponent } from './pages/video-upload/video-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { videoReducer } from './state/video.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    VideoLibraryComponent,
    SignupComponent,
    VideoUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    StoreModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.firebase),   
    StoreModule.forRoot({video: videoReducer}),
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
