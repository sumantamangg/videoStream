import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement>;
  currentTime = 0;
  isPlaying = false;

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
          console.log("irl after subscribe =", this.videoUrl.url); // Updated videoUrl after fetching
        } else {
          console.log('No video found for user');
        }
    });
  }

  onLoadedMetadata(e) {
    this.videoPlayer.nativeElement.currentTime = this.currentTime; // Set initial position if any
    this.videoPlayer.nativeElement.setAttribute('max', String(e.currentTarget.duration));
  }

  onSeek(e) {
    this.videoPlayer.nativeElement.currentTime = e.target.value;
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.videoPlayer.nativeElement.play();
    } else {
      this.videoPlayer.nativeElement.pause();
    }
  }
  
}
