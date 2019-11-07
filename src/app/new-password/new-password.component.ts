import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/_services/user.service';
import { first, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  form: FormGroup;
  token: string;

  submitted = false;
  showError = false;
  showSuccess = false;
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
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
    if (formValue.password) {
      this.userService.newPassword(formValue.password, this.token).pipe(first()).subscribe(res => {
        console.log(res);
        this.loading = false;
      })
    }
  }

}
