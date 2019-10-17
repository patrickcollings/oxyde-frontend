import { Component, OnInit } from '@angular/core';
import { SlideInOutAnimation } from '@app/_helpers/animations';
import { UserService } from '@app/_services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-whitelist-form',
  templateUrl: './whitelist-form.component.html',
  styleUrls: ['./whitelist-form.component.scss'],
  animations: [SlideInOutAnimation]
})
export class WhitelistFormComponent implements OnInit {

  formStates = [
    'in',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out'
  ]

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goTo(pos: number, from: number) {
    // Hide old form
    this.formStates[from] = 'out';
    // Show new form
    this.formStates[pos] = 'in';
  }

  restart() {
    // Hide all states
    this.formStates.fill('out');
    // Show first state
    this.formStates[0] = 'in';
  }

  complete() {
    // Update whitelisting complete
    this.userService.updateWhitelistingSetup(true).pipe(first()).subscribe(res => {
      this.router.navigate(['/setup']);
    });
  }

}
