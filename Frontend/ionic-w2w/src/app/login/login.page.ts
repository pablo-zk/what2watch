import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe((data) => {
        // data = {
        //   ...data,
        //   u: this.username,
        // };
        localStorage.setItem('u', this.username);
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
