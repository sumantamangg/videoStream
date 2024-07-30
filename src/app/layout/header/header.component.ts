import { Component, OnDestroy } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { AppRoutes } from '../../app.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {

  currentUser = null;
  private userSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router){
    this.userSubscription = this.authService.currentUser.subscribe(
      (userData: any)=>{
        this.currentUser = userData;
      }
    )
  }
  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  logout(){
    this.authService.signOut();
    this.router.navigate([AppRoutes.Login]);
  }
}
