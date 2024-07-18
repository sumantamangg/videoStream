import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser = null;
  constructor(private authService: AuthService,
              private router: Router){
    this.authService.currentUser.subscribe(
      userdata =>{
        this.currentUser = userdata;
      }
    )
  }
  logout(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
