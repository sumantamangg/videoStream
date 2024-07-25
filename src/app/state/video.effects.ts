import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { playVideo } from "./video.action";
import { AuthService } from "../services/auth.service";

@Injectable()
export class VideoEffects {
  currentUser = null;
  
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playVideo),
      withLatestFrom(this.store.select(this.currentUser.uid)),
      switchMap(([action, userId]) =>
        this.firestore.collection('videos').valueChanges().pipe(
          map(videos => {
            if (videos.length > 0) {
              return { type: '[Video API] Videos Loaded Success', videos };
            } else {
              this.toastr.error('No videos found'); 
              return { type: '[Video API] Videos Loaded Failure' };
            }
          }),
          catchError(() => of({ type: '[Video API] Videos Loaded Failure' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private store: Store,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }
}
