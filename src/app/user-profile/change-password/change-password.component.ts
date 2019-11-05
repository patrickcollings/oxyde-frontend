import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMsg: string;
  successMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { 
    this.form = this.formBuilder.group({
      old: new FormControl('', Validators.required),
      new: new FormControl('', Validators.required),
      new2: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
  }

  submit(result) {
    // Clear messages
    this.showError = false;
    this.showSuccess = false;

    if (result.new !== result.new2) {
      this.showError = true;
      this.errorMsg = 'Passwords do not match.'
    }

    this.userService.updatePassword(result.old, result.new).pipe(first()).subscribe(res => {
      if (res['success']) {
        this.showSuccess = true;
        this.successMsg = res['msg'];
      } else {
        this.showError = true;
        this.errorMsg = res['msg'];
      }
    })

    console.log(result);
  }

}
