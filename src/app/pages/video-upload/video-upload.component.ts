import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.css'
})
export class VideoUploadComponent {
  selectedFile!: File;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  currentUser:any = null;
  fileName = "";

  constructor(private storage: AngularFireStorage,
              private toastr: ToastrService,
              private firestore: AngularFirestore,
              private authService: AuthService,
              private router: Router
  ) {
    this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.isUploading = true;
      const filePath = `videos/${this.selectedFile.name}`; // Replace with dynamic path generation if needed
      const fileRef = this.storage.ref(filePath);
      const uploadTask = fileRef.put(this.selectedFile);

      uploadTask.percentageChanges().subscribe(progress => {
        this.uploadProgress = progress!;
      });

      uploadTask.snapshotChanges().subscribe(snapshot => {
        if (snapshot!.state === 'running') {
          // Uploading
        } else if (snapshot!.state === 'success') {
          snapshot!.ref.getDownloadURL().then(downloadURL => {
            this.storeVideoUrlInFirestore(downloadURL);
          console.log('Video uploaded successfully! URL:', downloadURL)});
          this.fileName = this.selectedFile.name;
          this.isUploading = false;
          this.uploadProgress = 0;
          this.toastr.success("upload completed");
          setTimeout(() => {
            this.router.navigate(['/gallery']); //This code makes sure the file is ready to be played
          }, 1200);
        }
      });
    }
  }
  storeVideoUrlInFirestore(downloadURL) {
  const userVideosRef = this.firestore.collection(this.currentUser?.uid);
  const nameFile = this.fileName;
  const timeStamp = new Date(); //normally should be server generated timestamp
  userVideosRef.add({
    url: downloadURL, 
    nameFile,
    timeStamp, 
  }).then(() => {
    console.log('Video URL and timestamp stored in Firestore!');
  });
}

}
