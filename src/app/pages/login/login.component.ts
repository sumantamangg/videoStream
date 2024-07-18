import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  currentUser: any ;
  submitInProgress = false;
  error = "";

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private store: Store
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  onSubmit(){
    this.submitInProgress = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.signIn(email, password)
      .subscribe({
        next: ()=> this.toastr.success("User Created"),
        error: (e) => {
          if (e.code == "auth/invalid-credential"){
            this.toastr.error("Email and password did not match", "try again");
          }
        },
        complete: ()=>{
          this.loginForm.reset();
          this.router.navigate(["/gallery"]);
        }
      })
    this.submitInProgress = false;
  }
}
