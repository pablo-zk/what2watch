import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(private router: Router, private navCtrl: NavController) {}

  goDetails(content) {
    this.router.navigate([`${content.media_type}/${content.id}`]);
  }

  goBack() {
    this.navCtrl.back();
  }
}
