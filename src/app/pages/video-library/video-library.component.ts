import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Video } from '../../state/video.model';
import { pauseVideo, playVideo } from '../../state/video.action';
import { selectVideoState } from '../../state/video.selector';

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
  videoState: Video;

  constructor(private firestore: AngularFirestore,
              private authService: AuthService,
              private store: Store
  ) { 
    this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  ngOnInit(): void {
    this.firestore.collection(this.currentUser.uid).valueChanges() 
      .subscribe(videos => {
        if (videos.length > 0) {
          this.videoUrl = videos[0]; 
          console.log("irl after subscribe =", this.videoUrl.url); 
        } else {
          console.log('No video found for user');
        }
    });
  }

  onLoadedMetadata(e) {
    this.videoPlayer.nativeElement.currentTime = this.currentTime; // Set initial position if any
    this.videoPlayer.nativeElement.setAttribute('max', String(e.currentTarget.duration));
    this.store.select(selectVideoState).subscribe(videoState => {
      this.currentTime = videoState.currentTime;
      this.isPlaying = videoState['isPlaying'];
      this.isPlaying ? this.videoPlayer.nativeElement.play(): this.videoPlayer.nativeElement.pause();
    });

  }

  onSeek(e) {
    this.videoPlayer.nativeElement.currentTime = e.target.value;
  }

  playPause(playpause) {
    this.isPlaying = playpause;
    if (this.isPlaying) {
      this.store.dispatch(playVideo());
    } else {
      this.store.dispatch(pauseVideo());
    }
  }
  
}
