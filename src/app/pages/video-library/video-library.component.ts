import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrl: './video-library.component.css'
})
export class VideoLibraryComponent implements OnInit{

  videoUrl: any = "";
  currentUser: any = null;

  constructor(private firestore: AngularFirestore,
              private authService: AuthService
  ) { 
    this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  ngOnInit(): void {
  
    this.firestore.collection(this.currentUser.uid).valueChanges() // Use valueChanges()
      .subscribe(videos => {
        if (videos.length > 0) {
          this.videoUrl = videos[0]; // get the first video
        } else {
          console.log('No video found for user');
        }
        console.log("irl after subscribe =", this.videoUrl.url); // Updated videoUrl after fetching
      });
  }
  
}
