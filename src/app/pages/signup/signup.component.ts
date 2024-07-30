import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, OnDestroy{

  signupForm!: FormGroup;
  submitInProgress = false; 
  currentUser: any = null;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router
  ){
    this.subscription = this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(){
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
      return;
    }
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    if (email === null || password === null) {
      return;
    }
      this.authService.signUp(email, password)
        .subscribe({
          next: () =>{
            this.toastr.success("signup succeeded")
          },
          error: (e) => {
            if (e.code === 'auth/email-already-in-use') {
              this.toastr.error('The email address is already in use.', 'dismiss'); 
            } else {
              this.toastr.error("Something went wrong. Please try again.", 'dismiss'); 
            }
          },
          complete: () => {
            this.router.navigate([AppRoutes.Login]);
          }
        })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
