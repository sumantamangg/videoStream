import { Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VideoLibraryComponent } from './pages/video-library/video-library.component';
import { AuthGuard } from './services/AuthGuard';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'gallery', component: VideoLibraryComponent,
        canActivate:mapToCanActivate([AuthGuard])
    }
];
