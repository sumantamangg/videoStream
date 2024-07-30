import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Video } from '../../state/video.model';
import { pauseVideo, playVideo } from '../../state/video.action';
import { selectVideoState } from '../../state/video.selector';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrl: './video-library.component.css'
})
export class VideoLibraryComponent implements OnInit, OnDestroy{

  videoUrl: any = "";
  videoName = "";
  currentUser: any = null;
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement>;
  currentTime = 0;
  isPlaying = false;
  videoState: Video;
  subscription: Subscription

  constructor(private firestore: AngularFirestore,
              private authService: AuthService,
              private store: Store,
              private toastr: ToastrService,
  ) { 
    this.subscription = this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  ngOnInit(): void {
    this.firestore.collection(this.currentUser.uid, ref =>
        ref.orderBy('timeStamp', 'desc').limit(1)
    ).valueChanges()
      .pipe(take(1))
      .subscribe(videos => {
        if (videos.length > 0) {
          const latestVideo = videos[0];
          this.videoUrl = latestVideo['url']; 
          this.videoName = latestVideo['nameFile']; 
          this.toastr.success(this.videoName + " loaded");
        } else {
          this.toastr.error('No video found for the user');
        }
      });
  }
  
  onLoadedMetadata(e) {
    this.videoPlayer.nativeElement.currentTime = this.currentTime; 
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
