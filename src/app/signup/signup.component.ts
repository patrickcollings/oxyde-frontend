import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  showError = false;
  errorMsg = '';
  showSuccess = false;
  successMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.showError = false;
    this.showSuccess = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm.controls.firstName.errors);
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.showSuccess = true;
          this.successMsg = data['message'];
          // this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
          console.log(error);
          this.showError = true;
          this.errorMsg = error;
          this.submitted = false;
          this.loading = false;
        });
  }

}
