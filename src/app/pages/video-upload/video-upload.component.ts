import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

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

  constructor(private storage: AngularFireStorage,
              private toastr: ToastrService,
              private firestore: AngularFirestore,
              private authService: AuthService
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

  onSubmit(form: NgForm) {

    if (this.selectedFile) {
      this.isUploading = true;
      const filePath = `videos/${this.selectedFile.name}`; // Replace with dynamic path generation if needed
      const fileRef = this.storage.ref(filePath);
      const uploadTask = fileRef.put(this.selectedFile);

      uploadTask.percentageChanges().subscribe(progress => {
        this.uploadProgress = progress!;
      });

      uploadTask.snapshotChanges().subscribe(snapshot => {
        console.log(snapshot);
        if (snapshot!.state === 'running') {
          // Uploading
        } else if (snapshot!.state === 'success') {
          snapshot!.ref.getDownloadURL().then(downloadURL => {
            this.storeVideoUrlInFirestore(downloadURL);
          console.log('Video uploaded successfully! URL:', downloadURL)});
          this.isUploading = false;
          this.uploadProgress = 0;
          this.toastr.success("upload completed");
          form.reset();
        }
      });
    }
  }
  storeVideoUrlInFirestore(url: string){
    const userVideosRef = this.firestore.collection(this.currentUser?.uid);
        // .doc(this.currentUser?.uid).collection('videos');
    userVideosRef.add({ url }).then(() => { 
      console.log('Video URL stored in Firestore!');
    });
  }
}
