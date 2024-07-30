import { Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VideoLibraryComponent } from './pages/video-library/video-library.component';
import { AuthGuard, NoAuthGuard } from './services/AuthGuard';
import { VideoUploadComponent } from './pages/video-upload/video-upload.component';

export enum AppRoutes {
    Login = "login",
    Signup = 'signup',
    Upload = 'upload',
    Gallery = 'gallery'
}

export const routes: Routes = [
    {path: '', redirectTo:AppRoutes.Login, pathMatch: 'full'},
    {path: AppRoutes.Login, component: LoginComponent},
    {path: AppRoutes.Signup, component: SignupComponent,
        canActivate:[NoAuthGuard]
    },
    {path: AppRoutes.Upload, component: VideoUploadComponent,
        canActivate:[AuthGuard]
    },
    {path: AppRoutes.Gallery, component: VideoLibraryComponent,
        canActivate:[AuthGuard]
    }
];

