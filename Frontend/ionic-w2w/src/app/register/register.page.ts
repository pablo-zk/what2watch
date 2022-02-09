import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.router.navigate(['/login']);
  }
  signup() {
    if (this.username && this.password) {
      this.authService.register(this.username, this.password).subscribe(
        (data) => {
          // data = {
          //   ...data,
          //   username: this.username,
          //   r: val.type,
          // };
          this.authService
            .login(this.username, this.password)
            .subscribe((data) => {
              localStorage.setItem('u', this.username);
              // data = {
              //   ...data,
              //   u: val.username,
              // };
              // Save session: Generate expiration date
              // this.authService
              //   .role(val.username, val.password)
              //   .subscribe((r) => {
              //     data = {
              //       ...data,
              //       r: r[r.length - 1],
              //     };
              //     this.authService.setSession(data);
              //   });
              console.log('User is logged in');
              this.router.navigateByUrl('/');
            });
        },
        () => {
          console.log('User is registered in');
          this.router.navigateByUrl('/');
        }
      );
    }
  }
}
