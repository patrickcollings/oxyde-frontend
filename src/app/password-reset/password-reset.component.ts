import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  showError = false;
  showSuccess = false;
  errorMsg = '';
  successMsg = '';
  loading = false;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
  }

  onSubmit(formValue) {
    this.submitted = true;
    this.loading = true;

    // console.log(this.form.hasError);
    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    if (formValue.email) {
      this.userService.resetPassword(formValue.email).pipe(first()).subscribe(res => {
        console.log(res);
        this.loading = false;
      })
    }
  }

}
