import { Component, OnInit } from '@angular/core';
import { EmailService } from '@app/_services/email.service';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whitelist-test',
  templateUrl: './whitelist-test.component.html',
  styleUrls: ['./whitelist-test.component.scss']
})
export class WhitelistTestComponent implements OnInit {

  email: string;

  constructor(
    private emailService: EmailService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  sendTest() {
    console.log('Sending test' + this.email);
    this.emailService.sendTest(this.email).pipe(first()).subscribe(res => {
      console.log(res);
    })
  }

  complete() {
    // this.userService.updateEmailTesting(true).pipe(first()).subscribe(res => {
    //   this.router.navigate(['/setup']);
    // })
  }

}
