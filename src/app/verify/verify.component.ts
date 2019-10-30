import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  showMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

    this.activatedRoute.queryParamMap
      .pipe(
        switchMap((params: Params) =>
          this.userService.verify(params.get('token'))) // Verify token
      )
      .subscribe(
        res => { 
          if (res['success']) {
            this.showMessage = res['message'];
          } else {
            this.showMessage = res['message'];
          }
         },
        err => {
          console.log(err);
        })
  }

  ngOnInit() {
  }

}
