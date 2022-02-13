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
    } else {
      this.showAlert();
      console.log('ERROR. Introduce datos');
    }
  }

  showAlert() {
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
}
