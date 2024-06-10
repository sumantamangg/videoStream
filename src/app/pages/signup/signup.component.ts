import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;
  submitInProgress = false; 
  currentUser: any = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router
  ){
    this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  ngOnInit(): void {
    if(this.currentUser) {
      this.router.navigate(['/gallery']);
    }
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(){
    const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
       
      this.authService.signUp(email, password)
        .subscribe({
          next: () =>{
            this.toastr.success("signup succeeded")
          },
          error: (e) => {
            if (e.code === 'auth/email-already-in-use') {
              this.toastr.error('The email address is already in use.', 'dismiss'); // Set user-friendly message
            } else {
              this.toastr.error("something happened", 'dismiss'); // Handle other errors
            }
          },
          complete: () => {
            this.signupForm.reset();
          }
        })
  }

}
