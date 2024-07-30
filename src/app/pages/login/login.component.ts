import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  currentUser: any ;
  submitInProgress = false;
  error = "";
  subscription: Subscription

  constructor(private fb: FormBuilder,
              private readonly  authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private store: Store
  ){
    this.subscription = this.authService.currentUser.subscribe(
      userdata => {
        this.currentUser = userdata;
      }
    );
  }
  ngOnInit(): void {
    
    if(this.currentUser) {
      this.router.navigate(['/gallery']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  onSubmit(){
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
      return;
    }
    this.submitInProgress = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    this.authService.signIn(email, password)
      .subscribe({
        next: ()=> this.toastr.success("User login success"),
        error: (e) => {
          if (e.code == "auth/invalid-credential"){
            this.toastr.error("Email and password did not match", "try again");
          }
        },
        complete: ()=>{
          this.loginForm.reset();
          this.router.navigate(["/upload"]);
        }
      })
    this.submitInProgress = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
