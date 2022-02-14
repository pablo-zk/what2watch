import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  infantil: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  login() {
    this.router.navigate(['/login']);
  }
  signup() {
    console.log('El boton es: ' + this.infantil);
    if (this.username && this.password) {
      this.authService
        .register(this.username, this.password, this.infantil ? 'KID' : '')
        .subscribe(
          (data) => {
            // data = {
            //   ...data,
            //   username: this.username,
            //   r: val.type,
            // };
            if (data.message.includes('ERROR')) {
              this.showAlert(data.message.split('.')[1]);
            } else {
              this.authService
                .login(this.username, this.password)
                .subscribe((data) => {
                  localStorage.setItem('u', this.username);
                  data = {
                    ...data,
                    u: this.username,
                  };
                  this.authService
                    .role(this.username, this.password)
                    .subscribe((r) => {
                      data = {
                        ...data,
                        r: r[r.length - 1],
                      };
                      this.authService.setSession(data);
                    });
                  console.log('User is logged in');
                  this.router.navigateByUrl('/');
                });
            }
          },
          () => {
            console.log('User is registered in');
            this.router.navigateByUrl('/');
          }
        );
    } else {
      this.showAlert('Campos introducido incorrectos');
      console.log('ERROR. Introduce datos');
    }
  }

  showAlert(message) {
    this.alertCtrl
      .create({
        header: 'ERROR',
        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }
}
