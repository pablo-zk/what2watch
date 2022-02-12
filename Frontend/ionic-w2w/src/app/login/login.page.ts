import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe((data) => {
        data = {
          ...data,
          u: this.username,
          token: data.token,
        };
        this.authService.setSession(data);
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    } else {
      this.presentAlert();
    }
    if (localStorage.getItem('u') == null) {
      this.presentAlert();
    }
  }

  presentAlert() {
    this.alertCtrl
      .create({
        header: 'ERROR',
        message: 'Campos introducido incorrectos',
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
